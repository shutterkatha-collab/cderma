const fs = require('fs');
const clientJs = fs.readFileSync('assets/js/cderma-client.js', 'utf8');

const dictMatch = clientJs.match(/const CDERMA_NEPALI_DICTIONARY = \{([\s\S]*?)\n\};/);
const dict = eval('({' + dictMatch[1] + '})');

const htmlDictMatch = clientJs.match(/const CDERMA_NEPALI_HTML = \{([\s\S]*?)\n\};/);
const htmlDict = eval('({' + htmlDictMatch[1] + '})');

const files = ['index.html', 'products.html', 'product-detail.html', 'science.html', 'b2b.html', 'clinics.html', 'monographs.html'];
let nonIconUntranslated = [];
let totalNodes = 0;
let translatedNodes = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  // Remove material-symbols-outlined spans
  content = content.replace(/<span\b[^>]*class=["'][^"']*material-symbols-outlined[^"']*["'][^>]*>[\s\S]*?<\/span>/gi, '');
  content = content.replace(/<i\b[^>]*class=["'][^"']*material-symbols-outlined[^"']*["'][^>]*>[\s\S]*?<\/i>/gi, '');

  const regex = />([^<]+)</g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    let str = m[1].replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&copy;/g, '©').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').trim().replace(/\s+/g, ' ');
    if (!str || str.length <= 1) continue;
    if (/^[\d\s.,:\-\/()+*#%·•—–_]+$/.test(str)) continue;
    if (str === 'EN' || str === 'नेपाली') continue;
    
    totalNodes++;
    if (/[\u0900-\u097F]/.test(str) || dict[str] || htmlDict[str]) {
      translatedNodes++;
    } else {
      nonIconUntranslated.push({ file: f, text: str });
    }
  }
});

console.log(`========================================`);
console.log(`Total visible content nodes: ${totalNodes}`);
console.log(`Translated nodes: ${translatedNodes}`);
console.log(`Translation coverage: ${(translatedNodes / totalNodes * 100).toFixed(2)}%`);
console.log(`Non-icon untranslated count: ${nonIconUntranslated.length}`);
if (nonIconUntranslated.length > 0) {
  console.log('Untranslated items:', nonIconUntranslated);
} else {
  console.log('✅ PERFECT! 100% of all visible content across all 7 pages has active Nepali translations!');
}
console.log(`========================================`);
