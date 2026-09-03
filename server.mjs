// Simple built-in HTTP server to serve dist/
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 4321;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0].split('#')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  try {
    reqUrl = decodeURIComponent(reqUrl);
  } catch (e) {}

  let filePath = path.join(DIST_DIR, reqUrl);

  function serveFile(targetPath, statusCode = 200) {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(targetPath, (readErr, content) => {
      if (readErr) {
        const err500 = path.join(DIST_DIR, '500.html');
        if (fs.existsSync(err500) && targetPath !== err500) {
          serveFile(err500, 500);
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
        }
      } else {
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      serveFile(path.join(filePath, 'index.html'));
    } else if (!err && stats.isFile()) {
      serveFile(filePath);
    } else {
      // Try appending .html or /index.html
      const htmlFile = filePath + '.html';
      const indexFile = path.join(filePath, 'index.html');

      if (fs.existsSync(htmlFile)) {
        serveFile(htmlFile);
      } else if (fs.existsSync(indexFile)) {
        serveFile(indexFile);
      } else {
        // Fallback to 404.html
        const notFoundFile = path.join(DIST_DIR, '404.html');
        if (fs.existsSync(notFoundFile)) {
          serveFile(notFoundFile, 404);
        } else {
          serveFile(path.join(DIST_DIR, 'index.html'), 404);
        }
      }
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Grade Calculator serving at http://127.0.0.1:${PORT}`);
});
