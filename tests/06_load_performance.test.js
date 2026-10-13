/**
 * Suite 06: Load & Concurrency Performance Testing
 * Referenced from Awesome Testing Tools: Load Testing Tools (ApacheBench - ab)
 * Measures requests per second, concurrency resilience, and response latency under stress.
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { execSync } = require('node:child_process');
const { BASE_URL, request } = require('./config');

function runApacheBench(endpoint, concurrency = 10, requests = 50) {
  const targetUrl = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  try {
    const cmd = `/usr/sbin/ab -c ${concurrency} -n ${requests} -q "${targetUrl}"`;
    const stdout = execSync(cmd, { encoding: 'utf8', timeout: 30000 });
    
    // Parse ab output
    const rpsMatch = stdout.match(/Requests per second:\s+([\d.]+)/);
    const timePerReqMatch = stdout.match(/Time per request:\s+([\d.]+)\s+\[ms\]\s+\(mean\)/);
    const failedMatch = stdout.match(/Failed requests:\s+(\d+)/);

    return {
      success: true,
      rps: rpsMatch ? parseFloat(rpsMatch[1]) : null,
      meanMs: timePerReqMatch ? parseFloat(timePerReqMatch[1]) : null,
      failed: failedMatch ? parseInt(failedMatch[1], 10) : 0,
      raw: stdout
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      stdout: err.stdout ? err.stdout.toString() : ''
    };
  }
}

describe('Load & Performance Benchmarking (ApacheBench)', () => {
  test('Benchmark Public Homepage (/) under concurrency', async () => {
    const result = runApacheBench('/', 10, 50);
    if (!result.success) {
      console.warn('ApacheBench execution note:', result.error);
      // Fallback: Concurrent native fetch test
      const promises = Array.from({ length: 20 }, () => request('/'));
      const responses = await Promise.all(promises);
      const allOk = responses.every(r => r.status === 200);
      assert.ok(allOk, 'All 20 concurrent requests must return 200 OK');
      return;
    }

    assert.equal(result.failed, 0, `Expected 0 failed requests under load, got ${result.failed}`);
    assert.ok(result.rps > 10, `Expected at least 10 requests/sec, achieved ${result.rps}`);
  });

  test('Benchmark REST Products API (/api/products) under concurrency', async () => {
    const result = runApacheBench('/api/products', 10, 50);
    if (!result.success) {
      const promises = Array.from({ length: 20 }, () => request('/api/products'));
      const responses = await Promise.all(promises);
      const allOk = responses.every(r => r.status === 200);
      assert.ok(allOk, 'All 20 concurrent requests must return 200 OK');
      return;
    }

    assert.equal(result.failed, 0, `Expected 0 failed requests on API, got ${result.failed}`);
    assert.ok(result.rps > 10, `API throughput should exceed 10 req/s, got ${result.rps}`);
  });

  test('Benchmark Product Monograph (/products/centella-barrier-restore-concentrate)', async () => {
    const result = runApacheBench('/products/centella-barrier-restore-concentrate', 10, 30);
    if (!result.success) {
      const promises = Array.from({ length: 15 }, () => request('/products/centella-barrier-restore-concentrate'));
      const responses = await Promise.all(promises);
      assert.ok(responses.every(r => r.status === 200));
      return;
    }

    assert.equal(result.failed, 0, 'No dropped connections on detail page');
  });
});
