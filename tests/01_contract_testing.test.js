/**
 * Suite 01: Contract Testing (JsonSchema & REST API Verification)
 * Referenced from Awesome Testing Tools: Contract Testing Tools (JsonSchema / Pact / RestQA)
 */

const assert = require('node:assert/strict');
const { test, describe } = require('node:test');
const { request } = require('./config');

function validateSchema(data, schema, path = 'root') {
  if (schema.type === 'array') {
    assert.ok(Array.isArray(data), `${path} should be an Array`);
    if (schema.minItems) {
      assert.ok(data.length >= schema.minItems, `${path} should have at least ${schema.minItems} items, got ${data.length}`);
    }
    if (schema.items && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        validateSchema(data[i], schema.items, `${path}[${i}]`);
      }
    }
    return;
  }

  if (schema.type === 'object') {
    assert.equal(typeof data, 'object', `${path} should be an Object`);
    assert.notEqual(data, null, `${path} should not be null`);

    if (schema.required) {
      for (const field of schema.required) {
        assert.ok(field in data, `${path} is missing required field: '${field}'`);
      }
    }

    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in data && data[key] !== null) {
          validateSchema(data[key], propSchema, `${path}.${key}`);
        }
      }
    }
    return;
  }

  if (schema.type === 'string') {
    assert.equal(typeof data, 'string', `${path} should be a string, got ${typeof data}`);
    return;
  }

  if (schema.type === 'number') {
    assert.equal(typeof data, 'number', `${path} should be a number, got ${typeof data}`);
    return;
  }

  if (schema.type === 'boolean') {
    assert.equal(typeof data, 'boolean', `${path} should be a boolean, got ${typeof data}`);
    return;
  }
}

describe('Contract Testing - cDerma REST API Schemas', () => {
  test('GET /api/products adheres to Product Collection Contract', async () => {
    const res = await request('/api/products');
    assert.equal(res.status, 200, 'Expected 200 OK');
    assert.match(res.headers.get('content-type'), /application\/json/i);

    const body = await res.json();
    const products = Array.isArray(body) ? body : body.products;
    assert.ok(Array.isArray(products), 'Products should be an array');
    
    const ProductSchema = {
      type: 'array',
      minItems: 6,
      items: {
        type: 'object',
        required: ['id', 'slug', 'title', 'category', 'volume'],
        properties: {
          id: { type: 'number' },
          slug: { type: 'string' },
          title: { type: 'string' },
          category: { type: 'string' },
          volume: { type: 'string' }
        }
      }
    };

    validateSchema(products, ProductSchema, 'ProductList');
    
    const slugs = products.map(p => p.slug);
    assert.ok(slugs.includes('centella-barrier-restore-concentrate'), 'Centella serum missing');
    assert.ok(slugs.includes('ceramide-deep-barrier-cream'), 'Ceramide cream missing');
  });

  test('GET /api/products?lang=ne returns localized Nepali contract', async () => {
    const res = await request('/api/products?lang=ne');
    assert.equal(res.status, 200);
    const body = await res.json();
    const products = Array.isArray(body) ? body : body.products;
    assert.ok(Array.isArray(products) && products.length >= 6);
    
    const centella = products.find(p => p.slug === 'centella-barrier-restore-concentrate');
    assert.ok(centella, 'Centella product missing');
    assert.ok(centella.title, 'Product must have localized title');
    // Ensure Nepali script characters exist
    assert.match(centella.title, /[\u0900-\u097F]/, 'Title should contain Devanagari / Nepali characters');
  });

  test('GET /api/products/:slug returns Single Product Contract', async () => {
    const res = await request('/api/products/centella-barrier-restore-concentrate');
    assert.equal(res.status, 200);
    const body = await res.json();
    const product = body.product || body;

    const SingleProductSchema = {
      type: 'object',
      required: ['id', 'slug', 'title', 'category', 'volume', 'inci_full', 'usage_instructions'],
      properties: {
        id: { type: 'number' },
        slug: { type: 'string' },
        title: { type: 'string' },
        volume: { type: 'string' },
        inci_full: { type: 'string' }
      }
    };

    validateSchema(product, SingleProductSchema, 'SingleProduct');
  });

  test('GET /api/settings adheres to Brand Settings Contract', async () => {
    const res = await request('/api/settings');
    assert.equal(res.status, 200);
    const body = await res.json();
    const settings = body.settings || body;

    const SettingsSchema = {
      type: 'object',
      required: ['brand_name', 'brand_tagline', 'contact_phone', 'contact_email', 'contact_address'],
      properties: {
        brand_name: { type: 'string' },
        brand_tagline: { type: 'string' },
        contact_phone: { type: 'string' },
        contact_email: { type: 'string' },
        contact_address: { type: 'string' }
      }
    };

    validateSchema(settings, SettingsSchema, 'Settings');
  });

  test('GET /api/clinics adheres to Clinics Contract', async () => {
    const res = await request('/api/clinics');
    assert.equal(res.status, 200);
    const body = await res.json();
    const clinics = Array.isArray(body) ? body : body.clinics;

    const ClinicsSchema = {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'address', 'city'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' }
        }
      }
    };

    validateSchema(clinics, ClinicsSchema, 'Clinics');
  });

  test('GET /api/monographs adheres to Clinical Monographs Contract', async () => {
    const res = await request('/api/monographs');
    assert.equal(res.status, 200);
    const body = await res.json();
    const monographs = Array.isArray(body) ? body : (body.monographs || body.posts);
    assert.ok(Array.isArray(monographs));
  });

  test('GET /api/hero-slides adheres to Hero Slides Contract', async () => {
    const res = await request('/api/hero-slides');
    assert.equal(res.status, 200);
    const body = await res.json();
    const slides = Array.isArray(body) ? body : (body.slides || body.data);
    assert.ok(Array.isArray(slides));
  });

  test('POST /api/inquiries rejects invalid payload with 400 Error Contract', async () => {
    const res = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // empty payload
    });

    assert.equal(res.status, 400, 'Expected 400 Bad Request on empty inquiry');
    const err = await res.json();
    assert.equal(err.success, false);
    assert.ok(err.error || err.message, 'Error message should be specified');
  });

  test('POST /api/inquiries accepts valid payload with Success Contract', async () => {
    const res = await request('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Contract Test Doctor',
        email: 'doctor.test@cderma.com.np',
        phone: '9841000001',
        subject: 'Clinical trial question',
        message: 'Contract validation for inquiry ingestion pipeline.',
        type: 'clinical'
      })
    });

    assert.ok(res.status === 200 || res.status === 201, `Expected 200/201, got ${res.status}`);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.inquiryId || data.inquiry_id, 'Inquiry ID should be returned');
  });

  test('POST /api/b2b/apply rejects invalid payload with 400 Error Contract', async () => {
    const res = await request('/api/b2b/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email' })
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });
});
