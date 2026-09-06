import worker from '../dist/_worker.js';

const testCases = [
  {
    name: '1. Apex HTTP root -> Apex HTTPS root',
    url: 'http://gradecalculatorfinalx.com/',
    headers: { 'x-forwarded-proto': 'http' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/',
  },
  {
    name: '2. WWW HTTP root -> Apex HTTPS root (single hop)',
    url: 'http://www.gradecalculatorfinalx.com/',
    headers: { 'x-forwarded-proto': 'http' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/',
  },
  {
    name: '3. WWW HTTPS root -> Apex HTTPS root',
    url: 'https://www.gradecalculatorfinalx.com/',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/',
  },
  {
    name: '4. WWW HTTPS path without trailing slash -> Apex HTTPS path with slash',
    url: 'https://www.gradecalculatorfinalx.com/about',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/about/',
  },
  {
    name: '5. WWW HTTP path with uppercase -> Apex HTTPS path with slash and lowercase (single hop)',
    url: 'http://www.gradecalculatorfinalx.com/About',
    headers: { 'x-forwarded-proto': 'http' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/about/',
  },
  {
    name: '6. Apex HTTPS missing trailing slash -> Trailing slash',
    url: 'https://gradecalculatorfinalx.com/about',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/about/',
  },
  {
    name: '7. Apex HTTPS uppercase with trailing slash -> Lowercase',
    url: 'https://gradecalculatorfinalx.com/About/',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/about/',
  },
  {
    name: '8. Root index.html -> Root /',
    url: 'https://gradecalculatorfinalx.com/index.html',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/',
  },
  {
    name: '9. Subfolder index.html -> Subfolder /',
    url: 'https://gradecalculatorfinalx.com/es/index.html',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/es/',
  },
  {
    name: '10. Path index.html -> Path with slash',
    url: 'https://gradecalculatorfinalx.com/about/index.html',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/about/',
  },
  {
    name: '11. Preserves query string parameters during canonical redirect',
    url: 'http://www.gradecalculatorfinalx.com/final-grade-calculator?ref=test&page=1',
    headers: { 'x-forwarded-proto': 'http' },
    expectedStatus: 301,
    expectedLocation: 'https://gradecalculatorfinalx.com/final-grade-calculator/?ref=test&page=1',
  },
  {
    name: '12. Static file extension is NOT forced to have trailing slash',
    url: 'https://gradecalculatorfinalx.com/og-image.png',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 200,
  },
  {
    name: '13. Canonical root passes through with 200 OK',
    url: 'https://gradecalculatorfinalx.com/',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 200,
  },
  {
    name: '14. Canonical page route passes through with 200 OK',
    url: 'https://gradecalculatorfinalx.com/about/',
    headers: { 'x-forwarded-proto': 'https' },
    expectedStatus: 200,
  },
];

let failed = 0;

for (const tc of testCases) {
  const req = new Request(tc.url, {
    headers: tc.headers || {},
  });
  const mockEnv = {
    ASSETS: {
      fetch: async (r) => new Response('Asset OK', { status: 200, headers: { 'Content-Type': 'text/html' } }),
    },
  };

  const res = await worker.fetch(req, mockEnv);
  const location = res.headers.get('Location');
  const hsts = res.headers.get('Strict-Transport-Security');

  let pass = true;
  if (res.status !== tc.expectedStatus) {
    console.error(`FAIL [${tc.name}]: expected status ${tc.expectedStatus}, got ${res.status}`);
    pass = false;
  }
  if (tc.expectedLocation && location !== tc.expectedLocation) {
    console.error(`FAIL [${tc.name}]: expected location ${tc.expectedLocation}, got ${location}`);
    pass = false;
  }
  if (!hsts || !hsts.includes('max-age=31536000; includeSubDomains')) {
    console.error(`FAIL [${tc.name}]: HSTS header missing or invalid: ${hsts}`);
    pass = false;
  }

  if (pass) {
    console.log(`PASS: ${tc.name} -> ${res.status}${location ? ' -> ' + location : ''}`);
  } else {
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log(`\nAll ${testCases.length} canonicalization unit tests passed successfully!`);
}
