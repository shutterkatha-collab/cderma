/**
 * Test Configuration for cDerma Nepal
 * Tools referenced from: https://github.com/ZoranPandovski/awesome-testing-tools.git
 */

const BASE_URL = process.env.TEST_TARGET || 'http://127.0.0.1:3000';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'cderma2026!';

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }

  setFromResponse(res) {
    const raw = res.headers.get('set-cookie');
    if (!raw) return;
    const parts = raw.split(/,(?=[^;]+=[^;]+)/);
    for (const p of parts) {
      const match = p.trim().match(/^([^=]+)=([^;]+)/);
      if (match) {
        this.cookies.set(match[1].trim(), match[2].trim());
      }
    }
  }

  getHeader() {
    if (this.cookies.size === 0) return '';
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  clear() {
    this.cookies.clear();
  }
}

async function request(endpoint, options = {}, jar = null) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const headers = { ...(options.headers || {}) };
  
  if (jar) {
    const cookieHeader = jar.getHeader();
    if (cookieHeader) headers['cookie'] = cookieHeader;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    redirect: options.redirect || 'manual'
  });

  if (jar) {
    jar.setFromResponse(res);
  }

  return res;
}

module.exports = {
  BASE_URL,
  ADMIN_USER,
  ADMIN_PASS,
  CookieJar,
  request
};
