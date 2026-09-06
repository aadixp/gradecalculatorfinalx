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

  // 4. Ensure lowercase URL path
  if (targetPath !== targetPath.toLowerCase()) {
    targetPath = targetPath.toLowerCase();
    shouldRedirect = true;
  }

  // 5. Ensure trailing slash consistency on page routes (ignore static assets with extensions)
  const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(targetPath);
  if (!hasFileExtension && !targetPath.endsWith('/')) {
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
