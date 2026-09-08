const fs = require('fs');
const path = require('path');

const clientJsPath = path.resolve(__dirname, '../assets/js/cderma-client.js');
let code = fs.readFileSync(clientJsPath, 'utf8');

const finalDict = require('../scratch/final_dict.json');
const finalHtmlDict = require('../scratch/final_html_dict.json');

// 1. Generate updated CDERMA_NEPALI_DICTIONARY string
const dictStr = 'const CDERMA_NEPALI_DICTIONARY = ' + JSON.stringify(finalDict, null, 2) + ';';

// 2. Generate updated CDERMA_NEPALI_HTML string
const htmlDictStr = 'const CDERMA_NEPALI_HTML = ' + JSON.stringify(finalHtmlDict, null, 2) + ';';

// 3. New applyBodyTranslations function
const newApplyBodyTranslations = `
function applyBodyTranslations(lang) {
  const isNe = lang === 'ne';
  document.documentElement.lang = isNe ? 'ne' : 'en';

  // 1. Data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (isNe) {
      if (key === 'region_language') el.textContent = 'क्षेत्र / भाषा:';
      if (key === 'display_language') el.textContent = 'भाषा चयन गर्नुहोस्';
    } else {
      if (key === 'region_language') el.textContent = 'REGION / LANGUAGE:';
      if (key === 'display_language') el.textContent = 'Display Language';
    }
  });

  // 2. Search inputs & placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(inp => {
    if (isNe) {
      if (inp.dataset.enPh === undefined) inp.dataset.enPh = inp.getAttribute('placeholder') || '';
      const orig = inp.dataset.enPh.trim();
      if (CDERMA_NEPALI_DICTIONARY[orig]) {
        inp.setAttribute('placeholder', CDERMA_NEPALI_DICTIONARY[orig]);
      } else if (orig && orig.toLowerCase().includes('search')) {
        inp.setAttribute('placeholder', 'कस्मेटिक स्टोर, क्लिनिक वा शहर खोज्नुहोस्...');
      }
    } else if (inp.dataset.enPh !== undefined) {
      inp.setAttribute('placeholder', inp.dataset.enPh);
    }
  });

  // 3. Dropdown <select> options
  document.querySelectorAll('select option').forEach(opt => {
    if (isNe) {
      if (opt.dataset.enText === undefined) opt.dataset.enText = opt.textContent;
      const clean = opt.dataset.enText.trim().replace(/\\s+/g, ' ');
      if (CDERMA_NEPALI_DICTIONARY[clean]) {
        opt.textContent = CDERMA_NEPALI_DICTIONARY[clean];
      }
    } else if (opt.dataset.enText !== undefined) {
      opt.textContent = opt.dataset.enText;
    }
  });

  // 4. HTML block replacements (CDERMA_NEPALI_HTML)
  const blockCandidates = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, [data-cms], .aeo-block, article > p');
  blockCandidates.forEach(el => {
    if (el.closest('.cderma-lang-toggle') || el.hasAttribute('data-lang-btn')) return;
    const cleanText = el.textContent.trim().replace(/\\s+/g, ' ');
    if (CDERMA_NEPALI_HTML[cleanText]) {
      if (isNe) {
        if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
        el.innerHTML = CDERMA_NEPALI_HTML[cleanText];
        el.dataset.cdermaHtmlTrans = "true";
      } else if (el.dataset.enHtml !== undefined) {
        el.innerHTML = el.dataset.enHtml;
        delete el.dataset.cdermaHtmlTrans;
      }
    }
  });

  // 5. Universal Text-Node TreeWalker for all visible text across the entire page
  if (document.body) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'IFRAME') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('.material-symbols-outlined') || parent.closest('svg') || parent.classList.contains('material-symbols-outlined')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('.cderma-lang-toggle') || parent.closest('[data-lang-btn]')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('[data-cderma-html-trans="true"]')) {
            return NodeFilter.FILTER_REJECT;
          }
          const val = node.nodeValue;
          if (!val || !val.trim()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      if (isNe) {
        if (node._cdermaEn === undefined) {
          node._cdermaEn = node.nodeValue;
        }
        const trimmed = node._cdermaEn.trim().replace(/\\s+/g, ' ');
        if (CDERMA_NEPALI_DICTIONARY[trimmed]) {
          const leadingWs = node._cdermaEn.match(/^\\s*/)[0];
          const trailingWs = node._cdermaEn.match(/\\s*$/)[0];
          node.nodeValue = leadingWs + CDERMA_NEPALI_DICTIONARY[trimmed] + trailingWs;
        }
      } else {
        if (node._cdermaEn !== undefined) {
          node.nodeValue = node._cdermaEn;
          delete node._cdermaEn;
        }
      }
    });
  }

  // 6. Sibling-combined text elements (e.g. elements with icon + text node)
  const compoundCandidates = document.querySelectorAll('a, button, span, div, label, p, th, td');
  compoundCandidates.forEach(el => {
    if (el.closest('.cderma-lang-toggle') || el.hasAttribute('data-lang-btn')) return;
    if (el.closest('.material-symbols-outlined') || el.tagName === 'SVG' || el.closest('svg')) return;
    if (el.dataset.cdermaHtmlTrans === "true") return;

    if (isNe) {
      if (el.dataset.enTextDirect === undefined) {
        const directText = Array.from(el.childNodes)
          .filter(n => n.nodeType === 3)
          .map(n => n.nodeValue)
          .join('')
          .trim()
          .replace(/\\s+/g, ' ');
        el.dataset.enTextDirect = directText;
      }
      const direct = el.dataset.enTextDirect;
      if (direct && CDERMA_NEPALI_DICTIONARY[direct]) {
        const trans = CDERMA_NEPALI_DICTIONARY[direct];
        el.childNodes.forEach(n => {
          if (n.nodeType === 3 && n.nodeValue.trim()) {
            const leadingWs = n.nodeValue.match(/^\\s*/)[0];
            const trailingWs = n.nodeValue.match(/\\s*$/)[0];
            n.nodeValue = leadingWs + trans + trailingWs;
          }
        });
      }
    }
  });
}
`;

// Replace from 'const CDERMA_NEPALI_DICTIONARY = {' up to end of applyBodyTranslations function
const regex = /const CDERMA_NEPALI_DICTIONARY = \{[\s\S]*?function applyBodyTranslations\(lang\) \{[\s\S]*?\n\}/;

if (!regex.test(code)) {
  console.error("Failed to match CDERMA_NEPALI_DICTIONARY and applyBodyTranslations in cderma-client.js");
  process.exit(1);
}

const replacement = dictStr + '\n\n' + htmlDictStr + '\n\n' + newApplyBodyTranslations.trim();
code = code.replace(regex, replacement);

// Also ensure applyBodyTranslations is triggered after /api/settings completes
const settingsMarker = 'document.querySelectorAll(\'[data-cms]\').forEach(el => {';
if (code.includes(settingsMarker) && !code.includes('applyBodyTranslations(activeLang); // Re-run on dynamic CMS settings')) {
  code = code.replace(
    /document\.querySelectorAll\('\[data-cms\]'\)\.forEach\(el => \{[\s\S]*?\}\);\s*\n/m,
    `document.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        if (s[key] !== undefined && s[key] !== null) {
          el.textContent = s[key];
        }
      });
      if (activeLang === 'ne') applyBodyTranslations('ne'); // Re-run on dynamic CMS settings\n`
  );
}

// In renderProductGrid: add re-translation call
if (!code.includes('if (isNe) applyBodyTranslations(\'ne\'); // Products grid translated')) {
  code = code.replace(
    /container\.innerHTML = products\.map\(\(p, idx\) => \{[\s\S]*?\}\)\.join\(''\);\s*\n/m,
    match => match + `  if (isNe) applyBodyTranslations('ne'); // Products grid translated\n`
  );
}

// In renderClinicsList: add re-translation call
if (!code.includes('if (getActiveLanguage() === \'ne\') applyBodyTranslations(\'ne\'); // Clinics list translated')) {
  code = code.replace(
    /container\.innerHTML = clinics\.map\(c => \{[\s\S]*?\}\)\.join\(''\);\s*\n/m,
    match => match + `  if (getActiveLanguage() === 'ne') applyBodyTranslations('ne'); // Clinics list translated\n`
  );
}

// In renderArticlesGrid: add re-translation call
if (!code.includes('if (isNe) applyBodyTranslations(\'ne\'); // Articles grid translated')) {
  code = code.replace(
    /container\.innerHTML = articles\.map\(a => \{[\s\S]*?\}\)\.join\(''\);\s*\n/m,
    match => match + `  if (isNe) applyBodyTranslations('ne'); // Articles grid translated\n`
  );
}

// In initProductDetail: add re-translation call
if (!code.includes('if (isNe) applyBodyTranslations(\'ne\'); // Product detail translated')) {
  code = code.replace(
    /if \(usageEl && p\.usage_instructions\) \{\s*usageEl\.textContent = p\.usage_instructions;\s*\}/m,
    `if (usageEl && p.usage_instructions) {
      usageEl.textContent = p.usage_instructions;
    }
    if (isNe) applyBodyTranslations('ne'); // Product detail translated`
  );
}

fs.writeFileSync(clientJsPath, code, 'utf8');
console.log('Successfully updated assets/js/cderma-client.js');
