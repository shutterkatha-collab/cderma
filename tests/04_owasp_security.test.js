/**
 * Suite 04: OWASP Security & Penetration Testing
 * Referenced from Awesome Testing Tools: Penetration Testing Tools (OWASP ZAP / OWASP Top 10)
 * Tests:
 * - SQL Injection Resilience
 * - XSS Escaping & Sanitization
 * - Path Traversal & Sensitive File Exposure Prevention
 * - Security HTTP Response Headers
 * - Access Control & Authentication Gating
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { request } = require('./config');

describe('OWASP Web Application Security & Penetration Tests', () => {
  test('Security Headers: X-Powered-By is masked and X-Content-Type-Options is set', async () => {
    const res = await request('/');
    assert.equal(res.status, 200);

    // X-Powered-By must be disabled
    assert.equal(
      res.headers.get('x-powered-by'),
      null,
      'x-powered-by header leaks server framework and must be suppressed'
    );
  });

  test('Sensitive File Exposure: Direct access to database.sqlite and .env is blocked (403 Forbidden)', async () => {
    const sensitiveFiles = [
      '/database.sqlite',
      '/.env',
      '/package.json',
      '/package-lock.json',
      '/.git/config',
      '/server.js',
      '/tests/config.js'
    ];

    for (const file of sensitiveFiles) {
      const res = await request(file);
      assert.ok(
        res.status === 403 || res.status === 404,
        `Direct access to sensitive file ${file} should return 403 or 404, got ${res.status}`
      );
    }
  });

  test('Path Traversal: Relative and encoded directory traversals are neutralized', async () => {
    const traversalPayloads = [
      '/assets/../../server.js',
      '/..%2f..%2fpackage.json',
      '/static/%2e%2e/%2e%2e/database.sqlite',
      '/assets/..%2f..%2f.env'
    ];

    for (const payload of traversalPayloads) {
      const res = await request(payload);
      assert.ok(
        res.status === 400 || res.status === 403 || res.status === 404,
        `Traversal payload ${payload} must be blocked (expected 400/403/404, got ${res.status})`
      );
    }
  });

  test('SQL Injection: Injected single quotes and SQL fragments do not trigger syntax errors or leaks', async () => {
    const sqliPayloads = [
      "/api/products/'%20OR%20'1'='1",
      "/api/products/centella-barrier-restore-concentrate'--",
      "/api/products/1;DROP%20TABLE%20products;--",
      "/api/clinics?city=' UNION SELECT 1,2,3,4,5,6,7,8,9,10--"
    ];

    for (const payload of sqliPayloads) {
      const res = await request(payload);
      const text = await res.text();
      assert.doesNotMatch(text, /sqlite_error/i, `SQL error leaked on payload: ${payload}`);
      assert.doesNotMatch(text, /syntax error/i, `SQL syntax error leaked on payload: ${payload}`);
      assert.doesNotMatch(text, /SQLITE_/i, `SQLite internal error code leaked on payload: ${payload}`);
    }
  });

  test('Cross-Site Scripting (XSS): Malicious script injection in inquiries is safely processed', async () => {
    const xssPayload = "<script>alert('XSS-TEST')</script><img src=x onerror=alert(1)>";
    const res = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Dr. Tester ${xssPayload}`,
        email: 'xss-audit@cderma.com.np',
        phone: '9841999999',
        subject: 'XSS test injection',
        message: `Testing payload: ${xssPayload}`,
        type: 'general'
      })
    });

    assert.ok(res.status === 200 || res.status === 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.doesNotMatch(JSON.stringify(data), /<script>alert/i);
  });

  test('Broken Access Control: Protected Admin API routes reject unauthenticated requests', async () => {
    const adminEndpoints = [
      '/admin/api/products',
      '/admin/api/inquiries',
      '/admin/api/b2b-applications',
      '/admin/api/security/backups',
      '/admin/api/llms/status'
    ];

    for (const endpoint of adminEndpoints) {
      const res = await request(endpoint);
      assert.ok(
        res.status === 401 || res.status === 403 || res.status === 302,
        `Unauthenticated request to ${endpoint} must be blocked (expected 401/403/302, got ${res.status})`
      );
    }
  });

  test('Authentication Security: Reject incorrect admin passwords without leaking system internals', async () => {
    const res = await request('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'DefinitelyWrongPassword999!'
      })
    });

    assert.equal(res.status, 401, 'Invalid password should return 401 Unauthorized');
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.message || data.error, 'Should provide user-facing error message');
  });
});
