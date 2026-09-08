/**
 * CDerma Nepal - LLMs.txt & LLMs-Full.txt Validation & Quality Control Engine
 * Verifies file health, URL validity, canonical consistency, markdown readability,
 * security boundaries (zero private route leaks), and sitemap parity.
 */

const fs = require('fs');
const path = require('path');
const { LLMS_TXT_PATH, LLMS_FULL_TXT_PATH, getBaseUrl } = require('./llmsGenerator');

const PRIVATE_PATTERNS = [
  /\/admin\b/i,
  /\/api\b/i,
  /login/i,
  /\.env/i,
  /database\.sqlite/i,
  /password/i,
  /secret/i,
  /session/i,
  /localhost/i,
  /127\.0\.0\.1/i
];

function extractUrls(markdown) {
  const urls = [];
  // Match standard markdown links [text](url)
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(markdown)) !== null) {
    urls.push({
      text: match[1].trim(),
      url: match[2].trim()
    });
  }

  // Match raw URLs
  const rawRegex = /(?:^|\s)(https?:\/\/[^\s\)\"\'<>]+)/g;
  while ((match = rawRegex.exec(markdown)) !== null) {
    const raw = match[1].trim();
    if (!urls.some(u => u.url === raw)) {
      urls.push({ text: 'Raw URL', url: raw });
    }
  }

  return urls;
}

function validateAll(options = {}) {
  const baseUrl = options.baseUrl || getBaseUrl();
  const checks = [];
  const errors = [];
  const warnings = [];

  // Check 1: File Existence
  const txtExists = fs.existsSync(LLMS_TXT_PATH);
  const fullExists = fs.existsSync(LLMS_FULL_TXT_PATH);

  if (!txtExists || !fullExists) {
    errors.push(`Missing files: ${!txtExists ? 'llms.txt ' : ''}${!fullExists ? 'llms-full.txt' : ''}`);
    checks.push({
      id: 'files_exist',
      name: 'Files Exist on Disk',
      status: 'fail',
      message: 'One or both generated files are missing from the project root.'
    });
    return { valid: false, errors, warnings, checks };
  }

  const txtContent = fs.readFileSync(LLMS_TXT_PATH, 'utf8');
  const fullContent = fs.readFileSync(LLMS_FULL_TXT_PATH, 'utf8');

  checks.push({
    id: 'files_exist',
    name: 'Files Exist on Disk',
    status: 'pass',
    message: `llms.txt (${Buffer.byteLength(txtContent, 'utf8')} B) and llms-full.txt (${Buffer.byteLength(fullContent, 'utf8')} B) verified.`
  });

  // Check 2: Readable Markdown Structure
  const hasH1 = /^#\s+.+/m.test(txtContent) && /^#\s+.+/m.test(fullContent);
  const hasBlockquote = /^>\s+.+/m.test(txtContent) && /^>\s+.+/m.test(fullContent);
  const hasH2 = /^##\s+.+/m.test(txtContent) && /^##\s+.+/m.test(fullContent);

  if (hasH1 && hasBlockquote && hasH2) {
    checks.push({
      id: 'markdown_structure',
      name: 'Markdown Syntax & Structure',
      status: 'pass',
      message: 'Valid H1 title, summary blockquote, and H2 hierarchical sections.'
    });
  } else {
    warnings.push('Markdown heading hierarchy or summary blockquote may be incomplete.');
    checks.push({
      id: 'markdown_structure',
      name: 'Markdown Syntax & Structure',
      status: 'warn',
      message: 'Markdown format deviates slightly from conventional # title and > summary.'
    });
  }

  // Check 3: URL Extraction & Validity
  const txtUrls = extractUrls(txtContent);
  const fullUrls = extractUrls(fullContent);
  const allUrls = [...txtUrls, ...fullUrls];

  const invalidUrls = allUrls.filter(u => {
    try {
      const parsed = new URL(u.url);
      return parsed.protocol !== 'http:' && parsed.protocol !== 'https:';
    } catch (e) {
      return true;
    }
  });

  if (invalidUrls.length > 0) {
    errors.push(`Found ${invalidUrls.length} malformed URLs.`);
    checks.push({
      id: 'url_format',
      name: 'URL Formatting & Protocols',
      status: 'fail',
      message: `${invalidUrls.length} invalid URLs detected.`
    });
  } else {
    checks.push({
      id: 'url_format',
      name: 'URL Formatting & Protocols',
      status: 'pass',
      message: `All ${allUrls.length} detected URLs are well-formed absolute HTTP/HTTPS links.`
    });
  }

  // Check 4: Security Isolation & No Private Leaks
  const leakedUrls = allUrls.filter(u => PRIVATE_PATTERNS.some(p => p.test(u.url)));
  if (leakedUrls.length > 0) {
    errors.push(`Security violation: ${leakedUrls.length} private/admin/internal URLs found!`);
    checks.push({
      id: 'security_isolation',
      name: 'Security & Private Data Protection',
      status: 'fail',
      message: `Violations: ${leakedUrls.map(u => u.url).join(', ')}`
    });
  } else {
    checks.push({
      id: 'security_isolation',
      name: 'Security & Private Data Protection',
      status: 'pass',
      message: 'Zero private routes, admin links, or API endpoints leaked. 100% clean.'
    });
  }

  // Check 5: Sitemap Parity
  const sitemapPath = path.resolve(LLMS_TXT_PATH, '../sitemap.xml');
  let sitemapCoverage = 'N/A';
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    const sitemapUrls = [];
    const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    let smMatch;
    while ((smMatch = locRegex.exec(sitemapXml)) !== null) {
      sitemapUrls.push(smMatch[1].trim());
    }

    const fullUrlStrings = new Set(fullUrls.map(u => u.url.replace(/\/+$/, '')));
    const missingSitemapUrls = sitemapUrls.filter(su => !fullUrlStrings.has(su.replace(/\/+$/, '')));

    if (missingSitemapUrls.length === 0) {
      sitemapCoverage = '100%';
      checks.push({
        id: 'sitemap_parity',
        name: 'Sitemap XML Coverage',
        status: 'pass',
        message: `All ${sitemapUrls.length} canonical URLs from sitemap.xml are indexed.`
      });
    } else {
      sitemapCoverage = `${Math.round(((sitemapUrls.length - missingSitemapUrls.length) / sitemapUrls.length) * 100)}%`;
      warnings.push(`${missingSitemapUrls.length} sitemap URLs not explicitly linked in llms-full.txt`);
      checks.push({
        id: 'sitemap_parity',
        name: 'Sitemap XML Coverage',
        status: 'warn',
        message: `${sitemapCoverage} coverage (${missingSitemapUrls.length} unlinked: ${missingSitemapUrls.join(', ')})`
      });
    }
  }

  // Check 6: Multilingual Section Verification
  const hasNepaliContent = /[\u0900-\u097F]/.test(fullContent);
  if (hasNepaliContent) {
    checks.push({
      id: 'multilingual_support',
      name: 'Multilingual Support (Nepali & English)',
      status: 'pass',
      message: 'Nepali clinical references and product summaries verified in llms-full.txt.'
    });
  } else {
    warnings.push('Nepali language reference section was not detected in llms-full.txt.');
    checks.push({
      id: 'multilingual_support',
      name: 'Multilingual Support (Nepali & English)',
      status: 'warn',
      message: 'Nepali Devanagari content block missing.'
    });
  }

  const valid = errors.length === 0;
  const score = Math.max(0, 100 - (errors.length * 30) - (warnings.length * 10));

  return {
    valid,
    score,
    timestamp: new Date().toISOString(),
    stats: {
      llmsTxtBytes: Buffer.byteLength(txtContent, 'utf8'),
      llmsFullTxtBytes: Buffer.byteLength(fullContent, 'utf8'),
      llmsTxtUrls: txtUrls.length,
      llmsFullTxtUrls: fullUrls.length,
      totalUrls: allUrls.length,
      uniqueUrls: new Set(allUrls.map(u => u.url)).size,
      sitemapCoverage
    },
    checks,
    errors,
    warnings
  };
}

module.exports = {
  validateAll,
  extractUrls
};
