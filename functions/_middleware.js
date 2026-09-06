export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

  let shouldRedirect = false;
  let targetProtocol = url.protocol;
  let targetHost = url.hostname;
  let targetPath = url.pathname;

  // 1. Check HTTP -> HTTPS (via x-forwarded-proto or url.protocol)
  const protoHeader = request.headers.get('x-forwarded-proto');
  if (!isLocalhost && (url.protocol === 'http:' || protoHeader === 'http')) {
    targetProtocol = 'https:';
    shouldRedirect = true;
  }

  // 2. Check WWW -> Apex domain (www.gradecalculatorfinalx.com -> gradecalculatorfinalx.com)
  const lowerHost = targetHost.toLowerCase();
  if (lowerHost === 'www.gradecalculatorfinalx.com') {
    targetHost = 'gradecalculatorfinalx.com';
    shouldRedirect = true;
  }

  // 3. Remove index file duplicates: /index.html, /index.htm, /index.php
  if (/\/(index\.(html?|php))$/i.test(targetPath)) {
    targetPath = targetPath.replace(/\/(index\.(html?|php))$/i, '') || '/';
    shouldRedirect = true;
  }

  // Check if request is for a static asset (has a file extension or is under /_astro/ or /styles/)
  const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(targetPath);
  const isStaticAsset = hasFileExtension || targetPath.startsWith('/_astro/') || targetPath.startsWith('/styles/');

  // 4. Ensure lowercase URL path (ONLY for page routes, NEVER for static assets like .js, .css, images, or _astro bundles)
  if (!isStaticAsset && targetPath !== targetPath.toLowerCase()) {
    targetPath = targetPath.toLowerCase();
    shouldRedirect = true;
  }

  // 5. Ensure trailing slash consistency on page routes (skip static assets)
  if (!isStaticAsset && !targetPath.endsWith('/')) {
    targetPath = targetPath + '/';
    shouldRedirect = true;
  }

  // If any normalization rule triggered, perform a single 301 permanent redirect
  if (shouldRedirect) {
    const canonicalUrl = `${targetProtocol}//${targetHost}${targetPath}${url.search}`;
    if (canonicalUrl !== url.href) {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': canonicalUrl,
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        },
      });
    }
  }

  // If no redirect needed, proceed to static asset
  const response = await next();

  // If static asset returned 404, check if it's a case-mismatched or cached _astro bundle request
  if (response.status === 404 && targetPath.startsWith('/_astro/')) {
    const requestedLower = targetPath.toLowerCase();
    const bundleMap = {
      'gradescale': 'GradeScaleModal.astro_astro_type_script_index_0_lang.BB4LSeDb.js',
      'layout': 'Layout.astro_astro_type_script_index_0_lang.C3GYNU7h.js',
      'mainpage': 'MainPage.astro_astro_type_script_index_0_lang.BPeTaIhU.js',
      'gpapage': 'GpaPage.astro_astro_type_script_index_0_lang.BeieWi0a.js',
      'weightedpage': 'WeightedPage.astro_astro_type_script_index_0_lang.CoX6eCyi.js',
    };
    for (const [key, actualFile] of Object.entries(bundleMap)) {
      if (requestedLower.includes(key)) {
        const fixedUrl = new URL(request.url);
        fixedUrl.pathname = `/_astro/${actualFile}`;
        if (context.env && context.env.ASSETS) {
          return context.env.ASSETS.fetch(new Request(fixedUrl, request));
        }
      }
    }
  }

  // Ensure Strict-Transport-Security header is always present on HTTPS responses
  if (!isLocalhost && (targetProtocol === 'https:' || protoHeader === 'https')) {
    const newHeaders = new Headers(response.headers);
    if (!newHeaders.has('Strict-Transport-Security')) {
      newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }
  }

  return response;
}
