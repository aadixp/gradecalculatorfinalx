import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const iconPath = path.join(publicDir, 'web-app-manifest-512x512.png');
const ogBannerPath = path.join(publicDir, 'og-image.png');
const ogBannerV2Path = path.join(publicDir, 'og-image-v2.png');
const ogSquarePath = path.join(publicDir, 'og-image-square.png');
const ogSquareV2Path = path.join(publicDir, 'og-image-square-v2.png');
const fav32Path = path.join(publicDir, 'favicon-32x32.png');

async function generateSocialAssets() {
  console.log('🎨 Generating social share assets and favicons from high-res icon...');

  // 1. Generate 32x32 favicon
  await sharp(iconPath)
    .resize(32, 32, { fit: 'contain' })
    .png()
    .toFile(fav32Path);
  console.log('✅ Generated public/favicon-32x32.png');

  // 2. Prepare icon for the 1200x630 banner (160x160)
  const bannerIconBuffer = await sharp(iconPath)
    .resize(160, 160, { fit: 'contain' })
    .png()
    .toBuffer();

  // 3. Create 1200x630 Landscape OG Image with a perfectly centered Safe Zone
  // The center 630x630 (from x=285 to x=915) contains the entire logo, title, and badge!
  const bannerSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#09090b" />
        <stop offset="50%" stop-color="#111114" />
        <stop offset="100%" stop-color="#09090b" />
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#18181b" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#0f0f12" stop-opacity="0.95" />
      </linearGradient>
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.25" />
      </pattern>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="60" result="blur" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Center Ambient Glow -->
    <circle cx="600" cy="315" r="220" fill="#3b82f6" fill-opacity="0.12" filter="url(#glow)" />
    <circle cx="600" cy="220" r="140" fill="#8b5cf6" fill-opacity="0.15" filter="url(#glow)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="4" fill="url(#accent)" />

    <!-- Main Centered Card Container (Safe for square crop) -->
    <rect x="220" y="55" width="760" height="520" rx="28" fill="url(#cardGrad)" stroke="#27272a" stroke-width="1.5" />

    <!-- Badge -->
    <rect x="475" y="270" width="250" height="32" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="1" />
    <text x="600" y="291" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#60a5fa" text-anchor="middle" letter-spacing="1">ACADEMIC GRADE SUITE</text>

    <!-- Main Title (Centered) -->
    <text x="600" y="365" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="-1.5">Final Grade Calculator</text>

    <!-- Subtitle -->
    <text x="600" y="415" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500" fill="#a1a1aa" text-anchor="middle">Weighted Grades, Final Exam &amp; GPA</text>

    <!-- Feature Tags -->
    <g transform="translate(600, 470)">
      <rect x="-290" y="0" width="135" height="34" rx="17" fill="#27272a" fill-opacity="0.6" stroke="#3f3f46" stroke-width="1" />
      <text x="-222" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">Weighted</text>

      <rect x="-140" y="0" width="135" height="34" rx="17" fill="#27272a" fill-opacity="0.6" stroke="#3f3f46" stroke-width="1" />
      <text x="-72" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">Final Exam</text>

      <rect x="10" y="0" width="135" height="34" rx="17" fill="#27272a" fill-opacity="0.6" stroke="#3f3f46" stroke-width="1" />
      <text x="78" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">College GPA</text>

      <rect x="160" y="0" width="135" height="34" rx="17" fill="#27272a" fill-opacity="0.6" stroke="#3f3f46" stroke-width="1" />
      <text x="228" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">Indian CGPA</text>
    </g>

    <!-- Footer URL -->
    <text x="600" y="540" font-family="monospace, 'Geist Mono', sans-serif" font-size="14" font-weight="500" fill="#71717a" text-anchor="middle">gradecalculatorfinalx.com • 100% Free</text>
  </svg>
  `;

  const bannerBuffer = await sharp(Buffer.from(bannerSvg))
    .composite([
      {
        input: bannerIconBuffer,
        top: 90,
        left: 520, // Centered horizontally: (1200 - 160) / 2 = 520
      }
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync(ogBannerPath, bannerBuffer);
  fs.writeFileSync(ogBannerV2Path, bannerBuffer);
  console.log('✅ Generated public/og-image.png and public/og-image-v2.png (1200x630)');

  // 4. Create 600x600 Dedicated Square OG Image for WhatsApp / Telegram / iMessage
  const squareIconBuffer = await sharp(iconPath)
    .resize(200, 200, { fit: 'contain' })
    .png()
    .toBuffer();

  const squareSvg = `
  <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sqBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#09090b" />
        <stop offset="50%" stop-color="#131318" />
        <stop offset="100%" stop-color="#09090b" />
      </linearGradient>
      <linearGradient id="sqAccent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient id="sqCard" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#18181b" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0e0e11" stop-opacity="0.98" />
      </linearGradient>
      <pattern id="sqGrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.3" />
      </pattern>
      <filter id="sqGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="50" result="blur" />
      </filter>
    </defs>

    <rect width="600" height="600" fill="url(#sqBg)" />
    <rect width="600" height="600" fill="url(#sqGrid)" />

    <!-- Ambient Glow Behind Icon -->
    <circle cx="300" cy="190" r="140" fill="#3b82f6" fill-opacity="0.2" filter="url(#sqGlow)" />
    <circle cx="300" cy="210" r="100" fill="#8b5cf6" fill-opacity="0.18" filter="url(#sqGlow)" />

    <!-- Top Accent Border -->
    <rect x="0" y="0" width="600" height="4" fill="url(#sqAccent)" />

    <!-- Inner Card -->
    <rect x="40" y="45" width="520" height="510" rx="28" fill="url(#sqCard)" stroke="#27272a" stroke-width="1.5" />

    <!-- Badge -->
    <rect x="185" y="305" width="230" height="28" rx="14" fill="#1e293b" stroke="#3b82f6" stroke-width="1" />
    <text x="300" y="324" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#60a5fa" text-anchor="middle" letter-spacing="1">ACADEMIC GRADE SUITE</text>

    <!-- Main Title -->
    <text x="300" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">Final Grade Calculator</text>

    <!-- Subtitle -->
    <text x="300" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="500" fill="#a1a1aa" text-anchor="middle">Weighted Grades • Final Exam • GPA</text>

    <!-- URL Tag -->
    <rect x="160" y="465" width="280" height="32" rx="16" fill="#27272a" fill-opacity="0.7" stroke="#3f3f46" stroke-width="1" />
    <text x="300" y="486" font-family="monospace, 'Geist Mono', sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">gradecalculatorfinalx.com</text>
  </svg>
  `;

  const squareBuffer = await sharp(Buffer.from(squareSvg))
    .composite([
      {
        input: squareIconBuffer,
        top: 85,
        left: 200, // Centered: (600 - 200) / 2 = 200
      }
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync(ogSquarePath, squareBuffer);
  fs.writeFileSync(ogSquareV2Path, squareBuffer);
  console.log('✅ Generated public/og-image-square.png and public/og-image-square-v2.png (600x600)');
}

generateSocialAssets().catch(console.error);
