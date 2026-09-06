import fs from 'fs';

const en = fs.readFileSync('dist/index.html', 'utf8');
const es = fs.readFileSync('dist/es/index.html', 'utf8');
const ja = fs.readFileSync('dist/ja/index.html', 'utf8');

const getTitle = (html) => {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1] : null;
};
const getDesc = (html) => {
  const m = html.match(/<meta name="description" content="([^"]*)"/i);
  return m ? m[1] : null;
};
const getOgTitle = (html) => {
  const m = html.match(/<meta property="og:title" content="([^"]*)"/i);
  return m ? m[1] : null;
};
const getOgDesc = (html) => {
  const m = html.match(/<meta property="og:description" content="([^"]*)"/i);
  return m ? m[1] : null;
};

console.log('=== English Homepage ===');
console.log('Title:   ', getTitle(en));
console.log('Desc:    ', getDesc(en));
console.log('og:title:', getOgTitle(en));
console.log('og:desc: ', getOgDesc(en));

console.log('\n=== Spanish Homepage ===');
console.log('Title:   ', getTitle(es));
console.log('Desc:    ', getDesc(es));

console.log('\n=== Japanese Homepage ===');
console.log('Title:   ', getTitle(ja));
console.log('Desc:    ', getDesc(ja));

const expectedTitle = "Final Grade Calculator - Weighted Grades, Final Exam & GPA";
const expectedDesc = "Free online grade calculator for weighted grades, final exam targets, GPA, CGPA, and what-if scenarios. Calculate your current grade, find the score you need on your final exam to reach your target grade, and explore what-if scenarios.";

const decodeHtml = (str) => str ? str.replace(/&amp;/g, '&') : str;

if (decodeHtml(getTitle(en)) !== expectedTitle) {
  console.error(`FAIL: English title mismatch. Expected "${expectedTitle}", got "${getTitle(en)}"`);
  process.exit(1);
}
if (decodeHtml(getDesc(en)) !== expectedDesc) {
  console.error(`FAIL: English desc mismatch. Expected "${expectedDesc}", got "${getDesc(en)}"`);
  process.exit(1);
}
if (decodeHtml(getOgTitle(en)) !== expectedTitle) {
  console.error(`FAIL: English og:title mismatch. Expected "${expectedTitle}", got "${getOgTitle(en)}"`);
  process.exit(1);
}
if (decodeHtml(getOgDesc(en)) !== expectedDesc) {
  console.error(`FAIL: English og:desc mismatch. Expected "${expectedDesc}", got "${getOgDesc(en)}"`);
  process.exit(1);
}

console.log('\n✅ ALL LOCAL BUILD TITLE & META CHECKS PASSED!');

import https from 'https';

https.get('https://gradecalculatorfinalx.com/', (res) => {
  let liveHtml = '';
  res.on('data', chunk => liveHtml += chunk);
  res.on('end', () => {
    const liveTitle = getTitle(liveHtml);
    const liveDesc = getDesc(liveHtml);
    const liveOgTitle = getOgTitle(liveHtml);

    console.log('\n=== LIVE PRODUCTION HOMEPAGE ===');
    console.log('Title:   ', liveTitle);
    console.log('Desc:    ', liveDesc);
    console.log('og:title:', liveOgTitle);

    if (decodeHtml(liveTitle) !== expectedTitle) {
      console.error(`FAIL: Live title mismatch! Expected "${expectedTitle}", got "${liveTitle}"`);
      process.exit(1);
    }
    if (decodeHtml(liveDesc) !== expectedDesc) {
      console.error(`FAIL: Live desc mismatch! Expected "${expectedDesc}", got "${liveDesc}"`);
      process.exit(1);
    }
    console.log('\n🎉 LIVE PRODUCTION HOMEPAGE CONFIRMED EXACTLY MATCHING!');
  });
});
