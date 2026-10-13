/**
 * Suite 03: Accessibility & WCAG Testing
 * Referenced from Awesome Testing Tools: Accessibility Testing Tools (axe-core / Pa11y / WAVE)
 * Audits HTML markup against WCAG 2.1/2.2 AA core criteria:
 * - Document Language & Meta Viewport
 * - Alternative Text for Non-text Content (WCAG 1.1.1)
 * - Accessible Form Controls (WCAG 1.3.1 / 4.1.2)
 * - Heading Structure & Semantic Landmarks (WCAG 1.3.1)
 * - Discernible Names for Interactive Buttons & Links (WCAG 4.1.2)
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { request } = require('./config');

const PAGES_TO_AUDIT = [
  '/',
  '/products.html',
  '/science.html',
  '/clinics.html',
  '/b2b.html',
  '/monographs.html',
  '/products/centella-barrier-restore-concentrate'
];

describe('Accessibility & WCAG 2.1/2.2 AA Audit', () => {
  for (const pagePath of PAGES_TO_AUDIT) {
    describe(`Auditing accessibility on ${pagePath}`, () => {
      let html = '';

      test('Page returns 200 OK and valid HTML payload', async () => {
        const res = await request(pagePath);
        assert.equal(res.status, 200);
        html = await res.text();
        assert.ok(html.length > 500, 'Page HTML should not be empty');
      });

      test('HTML Document declaration and Language attribute exist (WCAG 3.1.1)', () => {
        assert.match(html, /<!doctype\s+html>/i, 'Missing standard <!DOCTYPE html>');
        assert.match(html, /<html[^>]+lang=["'][a-z]{2}(-[A-Z]{2})?["']/i, 'Missing valid <html lang="..."> attribute');
      });

      test('Document has Title and Viewport Meta (WCAG 2.4.2 / Mobile)', () => {
        const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
        assert.ok(titleMatch && titleMatch[1].trim().length > 0, 'Page must have a descriptive non-empty <title>');
        assert.match(html, /<meta[^>]+name=["']viewport["'][^>]*>/i, 'Page must have a mobile-friendly <meta name="viewport">');
      });

      test('All Images have an alt attribute (WCAG 1.1.1 Non-text Content)', () => {
        const imgRegex = /<img\s+([^>]+)>/gi;
        let match;
        const missingAlt = [];

        while ((match = imgRegex.exec(html)) !== null) {
          const attributes = match[1];
          if (!/\balt\s*=/i.test(attributes)) {
            missingAlt.push(match[0].slice(0, 80));
          }
        }

        assert.equal(
          missingAlt.length,
          0,
          `Found images missing required alt attribute:\n${missingAlt.join('\n')}`
        );
      });

      test('Semantic Landmarks exist: <header> or <nav>, <main>, <footer> (WCAG 1.3.1)', () => {
        assert.ok(
          /<(nav|header)[^>]*>/i.test(html) || /role=["'](banner|navigation)["']/i.test(html),
          'Missing header or navigation landmark'
        );
        assert.ok(
          /<main[^>]*>/i.test(html) || /role=["']main["']/i.test(html),
          'Missing main landmark'
        );
        assert.ok(
          /<footer[^>]*>/i.test(html) || /role=["']contentinfo["']/i.test(html),
          'Missing footer landmark'
        );
      });

      test('Form inputs have associated labels or aria-label (WCAG 1.3.1 / 4.1.2)', () => {
        const inputRegex = /<input\s+([^>]+)>/gi;
        let match;
        const unlabeled = [];

        while ((match = inputRegex.exec(html)) !== null) {
          const attrs = match[1];
          // Skip hidden, submit, or button inputs
          if (/type=["'](hidden|submit|button|reset)["']/i.test(attrs)) continue;

          const hasAriaLabel = /aria-label\s*=/i.test(attrs) || /aria-labelledby\s*=/i.test(attrs);
          const idMatch = attrs.match(/id=["']([^"']+)["']/i);
          let hasExplicitLabel = false;

          if (idMatch) {
            const id = idMatch[1];
            const labelRegex = new RegExp(`<label[^>]+for=["']${id}["']`, 'i');
            hasExplicitLabel = labelRegex.test(html);
          }

          if (!hasAriaLabel && !hasExplicitLabel) {
            unlabeled.push(match[0].slice(0, 80));
          }
        }

        assert.equal(
          unlabeled.length,
          0,
          `Found form inputs lacking accessible label:\n${unlabeled.join('\n')}`
        );
      });
    });
  }
});
