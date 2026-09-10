export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";

    let shouldRedirect = false;
    let targetProtocol = url.protocol;
    let targetHost = url.hostname;
    let targetPath = url.pathname;

    // 1. Enforce HTTPS (HTTP -> HTTPS)
    const protoHeader = request.headers.get("x-forwarded-proto");
    if (!isLocalhost && (url.protocol === "http:" || protoHeader === "http")) {
      targetProtocol = "https:";
      shouldRedirect = true;
    }

    // 2. Enforce apex / non-www domain (WWW -> NON-WWW)
    const lowerHost = targetHost.toLowerCase();
    if (lowerHost === "www.gradecalculatorfinalx.com") {
      targetHost = "gradecalculatorfinalx.com";
      shouldRedirect = true;
    }

    // 3. Normalize index file duplicates (/index.html, /index.htm, /index.php -> /)
    if (/\/(index\.(html?|php))$/i.test(targetPath)) {
      targetPath = targetPath.replace(/\/(index\.(html?|php))$/i, "") || "/";
      shouldRedirect = true;
    }

    // 3b. Normalize sitemap.xml to authoritative sitemap-index.xml
    if (targetPath.toLowerCase() === "/sitemap.xml") {
      targetPath = "/sitemap-index.xml";
      shouldRedirect = true;
    }

    // 3c. Normalize duplicate utility paths (/privacy -> /privacy-policy/, /terms -> /terms-and-conditions/)
    if (/(^|\/)privacy\/?$/i.test(targetPath)) {
      targetPath = targetPath.replace(/privacy\/?$/i, "privacy-policy/");
      shouldRedirect = true;
    }
    if (/(^|\/)terms\/?$/i.test(targetPath)) {
      targetPath = targetPath.replace(/terms\/?$/i, "terms-and-conditions/");
      shouldRedirect = true;
    }

    // Check if request is for a static asset (has a file extension or is under /_astro/ or /styles/)
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(targetPath);
    const isStaticAsset = hasFileExtension || targetPath.startsWith("/_astro/") || targetPath.startsWith("/styles/");

    // 4. Enforce lowercase URL paths (ONLY for page routes, NEVER for static assets like .js, .css, images, or _astro bundles)
    if (!isStaticAsset && targetPath !== targetPath.toLowerCase()) {
      targetPath = targetPath.toLowerCase();
      shouldRedirect = true;
    }

    // 5. Enforce trailing slash consistency for directories and page routes (skip static assets)
    if (!isStaticAsset && !targetPath.endsWith("/")) {
      targetPath = targetPath + "/";
      shouldRedirect = true;
    }

    // Perform single-hop 301 permanent redirect if any non-canonical variant detected
    if (shouldRedirect) {
      const canonicalUrl = `${targetProtocol}//${targetHost}${targetPath}${url.search}`;
      if (canonicalUrl !== url.href) {
        return new Response(null, {
          status: 301,
          headers: {
            "Location": canonicalUrl,
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          },
        });
      }
    }

    // Serve static asset
    let response = await env.ASSETS.fetch(request);

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
          response = await env.ASSETS.fetch(new Request(fixedUrl, request));
          break;
        }
      }
    }

    // Maintain Strict-Transport-Security on all HTTPS responses
    if (!isLocalhost && (targetProtocol === "https:" || protoHeader === "https")) {
      const newHeaders = new Headers(response.headers);
      if (!newHeaders.has("Strict-Transport-Security")) {
        newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }
    }

    return response;
  }
};
