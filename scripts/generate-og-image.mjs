import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const iconPath = path.join(publicDir, 'icon.png');
const outputPath = path.join(publicDir, 'og-image.png');

async function createOgBanner() {
  console.log('🎨 Generating 1200x630 OG Share Image from icon.png...');

  // 1. Resize icon to 220x220 for the center/left of the card
  const iconBuffer = await sharp(iconPath)
    .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 2. Create SVG overlay with clean Geist styling, typography, and badges
  const svgOverlay = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="50%" stop-color="#111111" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#18181b" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#09090b" stop-opacity="0.9" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.3" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="4" fill="url(#accentGrad)" />

    <!-- Main Container Card -->
    <rect x="80" y="75" width="1040" height="480" rx="24" fill="url(#cardGrad)" stroke="#27272a" stroke-width="1.5" />

    <!-- Badge -->
    <rect x="360" y="145" width="220" height="32" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="1" />
    <text x="470" y="166" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#60a5fa" text-anchor="middle" letter-spacing="0.5">ACADEMIC GRADE SUITE</text>

    <!-- Title -->
    <text x="360" y="235" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="800" fill="#ffffff" letter-spacing="-1">GradeCalculatorFinalX</text>

    <!-- Subtitle -->
    <text x="360" y="285" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="400" fill="#a1a1aa">Weighted Grade, Final Exam Target &amp; Cumulative GPA Calculator</text>

    <!-- Feature Pills -->
    <g transform="translate(360, 335)">
      <!-- Pill 1 -->
      <rect x="0" y="0" width="165" height="38" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
      <text x="82" y="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="500" fill="#e4e4e7" text-anchor="middle">Weighted Grades</text>

      <!-- Pill 2 -->
      <rect x="175" y="0" width="165" height="38" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
      <text x="257" y="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="500" fill="#e4e4e7" text-anchor="middle">Final Exam Planner</text>

      <!-- Pill 3 -->
      <rect x="350" y="0" width="165" height="38" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
      <text x="432" y="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="500" fill="#e4e4e7" text-anchor="middle">College &amp; High School GPA</text>

      <!-- Pill 4 -->
      <rect x="525" y="0" width="165" height="38" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="1" />
      <text x="607" y="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="500" fill="#e4e4e7" text-anchor="middle">Indian UGC CGPA</text>
    </g>

    <!-- Bottom URL Tag -->
    <text x="360" y="460" font-family="monospace, 'Geist Mono', sans-serif" font-size="15" font-weight="500" fill="#71717a">gradecalculatorfinalx.com • 100% Private &amp; Free</text>
  </svg>
  `;

  // 3. Composite everything into the 1200x630 buffer
  const finalImage = await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: iconBuffer,
        top: 155,
        left: 120,
      }
    ])
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('✅ Generated public/og-image.png successfully:', finalImage);
}

createOgBanner().catch(console.error);
