#!/usr/bin/env node
/**
 * Master Test Runner for cDerma Nepal
 * Tools & methodology referenced from: https://github.com/ZoranPandovski/awesome-testing-tools.git
 *
 * Suites:
 *  1. Contract Testing (JsonSchema & REST API contracts)
 *  2. Broken Link & Media Asset Checker
 *  3. Accessibility & WCAG 2.1/2.2 AA Audit (axe-core / Pa11y standards)
 *  4. OWASP Security & Penetration Testing (OWASP Top 10)
 *  5. End-to-End User Journey Testing (Playwright / Cypress user flow simulation)
 *  6. Load & Performance Benchmarking (ApacheBench ab)
 */

const { spawn, spawnSync } = require('child_process');
const path = require('path');
const http = require('http');

const args = process.argv.slice(2);
let targetUrl = process.env.TEST_TARGET || 'http://127.0.0.1:3000';

for (const arg of args) {
  if (arg.startsWith('--target=')) {
    targetUrl = arg.split('=')[1];
  }
}

process.env.TEST_TARGET = targetUrl;

console.log('='.repeat(70));
console.log('🔬 cDerma Nepal - Comprehensive Testing Suite');
console.log('📚 Frameworks referenced from: github.com/ZoranPandovski/awesome-testing-tools');
console.log(`🎯 Target Endpoint: ${targetUrl}`);
console.log('='.repeat(70));

async function isServerRunning(url) {
  try {
    const parsed = new URL(url);
    return new Promise((resolve) => {
      const req = http.request({
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: '/',
        method: 'HEAD',
        timeout: 2000
      }, (res) => {
        resolve(res.statusCode < 500);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.end();
    });
  } catch (e) {
    return false;
  }
}

async function main() {
  let localServerProcess = null;

  if (targetUrl.includes('127.0.0.1') || targetUrl.includes('localhost')) {
    const running = await isServerRunning(targetUrl);
    if (!running) {
      console.log('⚡ Starting local test server (server.js)...');
      localServerProcess = spawn(process.execPath, ['server.js'], {
        cwd: path.resolve(__dirname, '..'),
        env: { ...process.env, PORT: '3000', NODE_ENV: 'test' },
        stdio: ['ignore', 'pipe', 'pipe']
      });

      // Wait for server to come online
      let ready = false;
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 200));
        if (await isServerRunning(targetUrl)) {
          ready = true;
          break;
        }
      }

      if (!ready) {
        console.error('❌ Failed to start local server within timeout.');
        if (localServerProcess) localServerProcess.kill();
        process.exit(1);
      }
      console.log('✅ Local test server online at http://127.0.0.1:3000\n');
    } else {
      console.log('✅ Test server is already running.\n');
    }
  }

  const testFiles = [
    'tests/01_contract_testing.test.js',
    'tests/02_broken_link_checker.test.js',
    'tests/03_accessibility_wcag.test.js',
    'tests/04_owasp_security.test.js',
    'tests/05_e2e_user_journeys.test.js',
    'tests/06_load_performance.test.js'
  ];

  console.log(`🚀 Executing ${testFiles.length} test suites with Node test runner...\n`);
  const startTime = Date.now();

  const runner = spawnSync(
    process.execPath,
    ['--test', ...testFiles],
    {
      cwd: path.resolve(__dirname, '..'),
      env: { ...process.env, TEST_TARGET: targetUrl },
      stdio: 'inherit'
    }
  );

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n' + '='.repeat(70));
  if (runner.status === 0) {
    console.log(`🎉 ALL TESTS PASSED in ${durationSec}s!`);
    console.log('✅ Contract, Link integrity, Accessibility, OWASP Security, E2E flows, and Load tests verified.');
  } else {
    console.log(`⚠️ Some tests reported failures (exit code ${runner.status}) in ${durationSec}s.`);
  }
  console.log('='.repeat(70));

  if (localServerProcess) {
    console.log('🛑 Shutting down spawned test server...');
    localServerProcess.kill();
  }

  process.exit(runner.status || 0);
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
