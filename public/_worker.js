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

    // 4. Enforce lowercase URL paths
    if (targetPath !== targetPath.toLowerCase()) {
      targetPath = targetPath.toLowerCase();
      shouldRedirect = true;
    }

    // 5. Enforce trailing slash consistency for directories and page routes (skip static file extensions)
    const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(targetPath);
    if (!hasFileExtension && !targetPath.endsWith("/")) {
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
    const response = await env.ASSETS.fetch(request);

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
