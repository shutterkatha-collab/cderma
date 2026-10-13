/**
 * Suite 05: End-to-End User Journey Testing
 * Referenced from Awesome Testing Tools: Automated Testing Tools (Playwright / Cypress / The Testing Library)
 * Simulates complete end-to-end user and administrator transaction flows:
 * - Journey 1: Bilingual Catalog Exploration
 * - Journey 2: Clinical Inquiry Form Submission
 * - Journey 3: B2B Partner Clinic Application
 * - Journey 4: Administrator Authentication, Inbox Verification & Secure Logout
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { request, CookieJar, ADMIN_USER, ADMIN_PASS } = require('./config');

describe('End-to-End User Journey Tests', () => {
  const uniqueTimestamp = Date.now();
  const testInquiryEmail = `patient.${uniqueTimestamp}@test.np`;
  const testClinicEmail = `clinic.${uniqueTimestamp}@test.np`;

  test('User Journey 1: Customer browses formulations in English and Nepali', async () => {
    // 1. Fetch catalog in English
    const resEn = await request('/api/products');
    assert.equal(resEn.status, 200);
    const bodyEn = await resEn.json();
    const productsEn = Array.isArray(bodyEn) ? bodyEn : bodyEn.products;
    assert.ok(productsEn.length >= 6, `Expected at least 6 formulations, got ${productsEn.length}`);

    // 2. Fetch catalog in Nepali
    const resNe = await request('/api/products?lang=ne');
    assert.equal(resNe.status, 200);
    const bodyNe = await resNe.json();
    const productsNe = Array.isArray(bodyNe) ? bodyNe : bodyNe.products;
    assert.ok(productsNe.length >= 6);

    // 3. Inspect individual product monograph
    const resSlug = await request('/api/products/centella-barrier-restore-concentrate');
    assert.equal(resSlug.status, 200);
    const bodySlug = await resSlug.json();
    const detail = bodySlug.product || bodySlug;
    assert.equal(detail.slug, 'centella-barrier-restore-concentrate');
    assert.ok(detail.inci_full && detail.inci_full.includes('Centella Asiatica'));
  });

  test('User Journey 2: Customer submits clinical consultation inquiry', async () => {
    const payload = {
      name: `Suman Shrestha ${uniqueTimestamp}`,
      email: testInquiryEmail,
      phone: '9841234567',
      subject: 'Inquiry regarding Centella Barrier Concentrate',
      message: 'Seeking advice on Centella Barrier Restore for sensitive post-procedure skin.',
      type: 'clinical'
    };

    const res = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const result = await res.json();
    assert.equal(result.success, true);
    assert.ok(result.inquiryId || result.inquiry_id, 'Server must return generated inquiry ID');
  });

  test('User Journey 3: Clinic submits B2B Dermatology Partnership Application', async () => {
    const payload = {
      practiceName: `Kathmandu Derma Center ${uniqueTimestamp}`,
      contactPerson: 'Dr. Aarav Sharma',
      email: testClinicEmail,
      phone: '01-4455667',
      facilityCategory: 'dermatology',
      regNumber: 'NMC-88214',
      province: 'Bagmati',
      volumeTier: 'tier_1',
      sampleKit: true
    };

    const res = await request('/api/b2b/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const result = await res.json();
    assert.equal(result.success, true);
    assert.ok(result.applicationId, 'Server must return generated applicationId');
  });

  test('User Journey 4: Admin authenticates, verifies submitted inquiries and logs out', async () => {
    const jar = new CookieJar();

    // 1. Admin Login
    const loginRes = await request('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: ADMIN_USER,
        password: ADMIN_PASS
      })
    }, jar);

    assert.equal(loginRes.status, 200, `Admin login failed with status ${loginRes.status}`);
    const loginData = await loginRes.json();
    assert.equal(loginData.success, true);
    assert.ok(jar.getHeader().includes('__cderma_sid'), 'Session cookie __cderma_sid must be set');

    // 2. Fetch Inquiries Inbox as authenticated admin
    const inqRes = await request('/admin/api/inquiries', {}, jar);
    assert.equal(inqRes.status, 200);
    const inqBody = await inqRes.json();
    const inquiries = Array.isArray(inqBody) ? inqBody : inqBody.inquiries;
    assert.ok(Array.isArray(inquiries), 'Inquiries must be an array');
    
    // Check that Journey 2 inquiry appears in the list
    const foundInquiry = inquiries.find(inq => inq.email === testInquiryEmail);
    assert.ok(foundInquiry, `Submitted inquiry ${testInquiryEmail} should appear in admin inbox`);

    // 3. Fetch B2B Applications Inbox
    const b2bRes = await request('/admin/api/b2b-applications', {}, jar);
    assert.equal(b2bRes.status, 200);
    const b2bBody = await b2bRes.json();
    const applications = Array.isArray(b2bBody) ? b2bBody : b2bBody.applications;
    assert.ok(Array.isArray(applications), 'B2B applications must be an array');
    const foundApp = applications.find(a => a.email === testClinicEmail);
    assert.ok(foundApp, `Submitted application ${testClinicEmail} should appear in admin B2B inbox`);

    // 4. Check System Security Backups API
    const backupRes = await request('/admin/api/security/backups', {}, jar);
    assert.equal(backupRes.status, 200);

    // 5. Admin Logout
    const logoutRes = await request('/admin/logout', { method: 'POST' }, jar);
    assert.ok(logoutRes.status === 200 || logoutRes.status === 302);

    // 6. Verify session is invalidated
    jar.clear();
    const postLogoutRes = await request('/admin/api/inquiries', {}, jar);
    assert.ok(
      postLogoutRes.status === 401 || postLogoutRes.status === 403 || postLogoutRes.status === 302,
      'Subsequent requests after logout must be unauthenticated'
    );
  });
});
