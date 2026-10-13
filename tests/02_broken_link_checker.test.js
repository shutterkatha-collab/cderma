/**
 * Suite 02: Broken Link & Asset Checker
 * Referenced from Awesome Testing Tools: Broken Link Checker
 * Crawls web pages concurrently, extracts links & media assets, and validates status codes.
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { request } = require('./config');

const ENTRY_POINTS = [
  '/',
  '/products.html',
  '/science.html',
  '/clinics.html',
  '/b2b.html',
  '/monographs.html',
  '/products/centella-barrier-restore-concentrate',
  '/products/ceramide-deep-barrier-cream',
  '/products/physiological-balancing-gel-cleanser',
  '/products/high-altitude-mineral-shield-spf50',
  '/products/multi-depth-hyaluronic-hydrating-mist',
  '/products/overnight-cellular-resurfacing-elixir',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt'
];

function extractUrls(html) {
  const urls = new Set();
  
  // Extract <a href="...">
  const aRegex = /<a\s+[^>]*href=["']([^"']+)["']/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    urls.add({ type: 'link', url: match[1] });
  }

  // Extract <img src="...">
  const imgRegex = /<img\s+[^>]*src=["']([^"']+)["']/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    urls.add({ type: 'image', url: match[1] });
  }

  // Extract <link rel="stylesheet" href="...">
  const linkRegex = /<link\s+[^>]*href=["']([^"']+)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    urls.add({ type: 'stylesheet/meta', url: match[1] });
  }

  // Extract <script src="...">
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    urls.add({ type: 'script', url: match[1] });
  }

  return Array.from(urls);
}

describe('Broken Link & Media Asset Checker', () => {
  test('All primary entry points return 200 OK', async () => {
    for (const path of ENTRY_POINTS) {
      const res = await request(path);
      assert.equal(
        res.status,
        200,
        `Expected 200 OK for entry point ${path}, but got ${res.status}`
      );
    }
  });

  test('All extracted internal assets, scripts, stylesheets, and images return 200 OK', async () => {
    const verifiedUrls = new Map(); // url -> status
    const brokenUrls = [];

    // Crawl first 4 major HTML pages
    const samplePages = ['/', '/products.html', '/science.html', '/b2b.html'];

    for (const pagePath of samplePages) {
      const pageRes = await request(pagePath);
      if (pageRes.status !== 200) continue;
      const html = await pageRes.text();
      const extracted = extractUrls(html);

      for (const item of extracted) {
        const urlStr = item.url.trim();

        // Skip external links, tel:, mailto:, javascript:, and anchors
        if (
          !urlStr ||
          urlStr.startsWith('#') ||
          urlStr.startsWith('mailto:') ||
          urlStr.startsWith('tel:') ||
          urlStr.startsWith('javascript:') ||
          urlStr.startsWith('data:') ||
          urlStr.startsWith('http://') ||
          urlStr.startsWith('https://')
        ) {
          continue;
        }

        // Clean relative URL
        const cleanPath = urlStr.startsWith('/') ? urlStr : `/${urlStr}`;

        if (verifiedUrls.has(cleanPath)) {
          continue;
        }

        try {
          const res = await request(cleanPath);
          verifiedUrls.set(cleanPath, res.status);
          if (res.status >= 400) {
            brokenUrls.push({ page: pagePath, asset: cleanPath, type: item.type, status: res.status });
          }
        } catch (err) {
          brokenUrls.push({ page: pagePath, asset: cleanPath, type: item.type, error: err.message });
        }
      }
    }

    assert.equal(
      brokenUrls.length,
      0,
      `Detected broken internal assets/links:\n${JSON.stringify(brokenUrls, null, 2)}`
    );
  });
});
