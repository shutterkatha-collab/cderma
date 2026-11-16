require('dotenv').config();
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { db, initDatabase } = require('./src/config/db');

const apiRoutes = require('./src/routes/api');
const adminRoutes = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const { TRUSTED_HOSTS } = require('./src/services/securityService');

// 1. Enable Trust Proxy (required for secure cookies and accurate client IP behind Hostinger CDN / reverse proxy)
app.set('trust proxy', 1);
app.disable('x-powered-by');

// 2. Sensitive File Shield Middleware: Block direct downloads of database, config, and source files
const BLOCKED_FILE_EXTENSIONS = /\.(sqlite|sqlite3|db|env|json|lock|log|git|sh|yml|yaml|md|ts|map|bak|sql)$/i;
app.use((req, res, next) => {
  const pathname = req.path.toLowerCase();
  // Allow explicit legitimate public XML/TXT files
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt' || pathname === '/llms.txt' || pathname === '/llms-full.txt') {
    return next();
  }
  if (BLOCKED_FILE_EXTENSIONS.test(pathname) || pathname.includes('database.sqlite')) {
    return res.status(403).type('text/plain').send('403 Forbidden: Direct access to internal system files is prohibited.');
  }
  next();
});

// 3. Strict CORS Policy
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    try {
      const hostname = new URL(origin).hostname.toLowerCase();
      if (TRUSTED_HOSTS.has(hostname) || hostname.endsWith('.hostingersite.com')) {
        return callback(null, true);
      }
      return callback(new Error('CORS request blocked from untrusted origin: ' + hostname));
    } catch (e) {
      return callback(new Error('Malformed origin header'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token', 'Accept']
};
app.use(cors(corsOptions));

// 4. Request body parsing with strict size limits (prevents payload flood / denial of service)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 5. Hardened Session for Admin authentication
app.use(session({
  name: '__cderma_sid',
  secret: process.env.SESSION_SECRET || 'cderma_nepal_clinical_botanical_luxury_2026',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days max lifetime
    httpOnly: true,                  // Mitigate XSS session theft
    sameSite: 'lax',                 // Strict CSRF defense on top-level navigations
    secure: 'auto'                   // Automatically enforce secure on HTTPS via trust proxy, allow HTTP on localhost
  }
}));

// 6. Comprehensive Security Headers & Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // Enforce HSTS in production or over HTTPS
  if (isProduction || req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content Security Policy tailored for CDerma typography and UI libraries
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://cdermanepal.com https://www.cdermanepal.com https://cderma.com.np https://antiquewhite-porcupine-932870.hostingersite.com https://*.hostingersite.com",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));

  next();
});

// 7. Static Asset Directories with Content-Type and Nosniff enforcement
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '30d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Route fallback: ensure subroutes like /products/* can resolve relative /products/assets/*
app.use('/products/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '30d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

app.use('/uploads', (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Disposition', 'inline');
  next();
}, express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: '1d'
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Public APIs
app.use('/api', apiRoutes);

// Admin CMS
app.use('/admin', adminRoutes);

// Favicon Handlers
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'assets/images/favicon.svg')));
app.get('/favicon.svg', (req, res) => res.sendFile(path.join(__dirname, 'assets/images/favicon.svg')));

// Clean Route Handlers for Public Web Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));

app.get('/product-detail', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/product-detail.html', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));

// SSR Dynamic SEO Metadata for Individual Product Pages
app.get('/products/:slug', (req, res) => {
  const slug = req.params.slug;
  const detailFile = path.join(__dirname, 'product-detail.html');
  try {
    const product = db.prepare("SELECT * FROM products WHERE slug = ? AND status != 'archived'").get(slug);
    if (!product) {
      return res.sendFile(detailFile);
    }

    let html = fs.readFileSync(detailFile, 'utf8');
    const baseUrl = (process.env.SITE_URL || 'https://cdermanepal.com').replace(/\/+$/, '');
    const canonicalUrl = `${baseUrl}/products/${encodeURIComponent(product.slug)}`;
    const pageTitle = `${product.title} | Doctor-Recommended Face Care Nepal | CDerma Wholesale`;
    const cleanDesc = (product.summary || product.description || 'Doctor-prescribed clinical skincare formulation by CDerma Nepal.').replace(/"/g, '&quot;').replace(/\n+/g, ' ').slice(0, 220);
    const prodImg = product.image_url
      ? (product.image_url.startsWith('http') ? product.image_url : `${baseUrl}/${product.image_url.replace(/^\//, '')}`)
      : `${baseUrl}/assets/images/cderma-logo.png`;

    // 1. Replace Title & Meta Description
    html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
    html = html.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${cleanDesc}"`);

    // 2. Canonical & Hreflang
    html = html.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${canonicalUrl}"`);
    html = html.replace(/<link rel="alternate" hreflang="en-NP" href=".*?"/i, `<link rel="alternate" hreflang="en-NP" href="${canonicalUrl}"`);
    html = html.replace(/<link rel="alternate" hreflang="x-default" href=".*?"/i, `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}"`);

    // 3. Open Graph Tags
    html = html.replace(/<meta property="og:title" content=".*?"/i, `<meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}"`);
    html = html.replace(/<meta property="og:description" content=".*?"/i, `<meta property="og:description" content="${cleanDesc}"`);
    html = html.replace(/<meta property="og:url" content=".*?"/i, `<meta property="og:url" content="${canonicalUrl}"`);
    html = html.replace(/<meta property="og:image" content=".*?"/i, `<meta property="og:image" content="${prodImg}"`);

    // 4. Twitter Tags
    html = html.replace(/<meta name="twitter:title" content=".*?"/i, `<meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}"`);
    html = html.replace(/<meta name="twitter:description" content=".*?"/i, `<meta name="twitter:description" content="${cleanDesc}"`);
    html = html.replace(/<meta name="twitter:image" content=".*?"/i, `<meta name="twitter:image" content="${prodImg}"`);

    // 5. Breadcrumb JSON-LD update
    html = html.replace(
      /"position":\s*3,\s*"name":\s*".*?",\s*"item":\s*".*?"/,
      `"position": 3, "name": "${product.title.replace(/"/g, '\\"')}", "item": "${canonicalUrl}"`
    );

    // 6. Product Schema JSON-LD update
    const productSchema = {
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "name": product.title,
      "alternateName": product.subtitle || product.title,
      "image": prodImg,
      "description": cleanDesc,
      "sku": `CD-NP-0${product.id}`,
      "category": `Face Care / ${product.category || 'Clinical'}`,
      "brand": {
        "@type": "Brand",
        "name": "CDerma"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "CDerma Nepal",
        "url": `${baseUrl}/`
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "B2B wholesale buyers, cosmetic stores, pharmacies, dermatology clinics, beauty salons"
      },
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "NPR",
        "price": product.price_npr || 2500,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "CDerma Nepal"
        }
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Wholesale Supply",
          "value": "Available for B2B distribution to cosmetic retailers, pharmacies, salons, and dermatology clinics across Nepal"
        },
        {
          "@type": "PropertyValue",
          "name": "Minimum Order Quantity",
          "value": "Contact CDerma Nepal via B2B portal for wholesale MOQ and margin structure"
        }
      ]
    };
    html = html.replace(/\{[^{}]*"@type":\s*"Product"[\s\S]*?"additionalProperty":\s*\[[\s\S]*?\]\s*\}/, JSON.stringify(productSchema, null, 2));

    // 7. SSR HTML DOM Pre-filling for search engines and zero-CLS load
    html = html.replace(/<h1[^>]*id="p-title"[^>]*>[\s\S]*?<\/h1>/i, `<h1 class="font-display-lg text-[26px] sm:text-[32px] lg:text-[34px] leading-tight text-on-surface font-semibold tracking-tight" id="p-title">${product.title}</h1>`);
    html = html.replace(/<p[^>]*id="p-desc"[^>]*>[\s\S]*?<\/p>/i, `<p class="text-[14px] sm:text-[15px] text-on-surface-variant font-normal leading-relaxed" id="p-desc">${product.description || product.summary || ''}</p>`);
    html = html.replace(/<span[^>]*id="p-breadcrumb"[^>]*>[\s\S]*?<\/span>/i, `<span class="text-on-surface font-medium" id="p-breadcrumb">${product.title}</span>`);
    if (product.category) {
      html = html.replace(/<span[^>]*id="p-category"[^>]*>[\s\S]*?<\/span>/i, `<span class="text-[12px] font-bold uppercase tracking-widest text-secondary" id="p-category">${product.category}</span>`);
    }
    if (product.volume) {
      html = html.replace(/<span[^>]*id="p-volume"[^>]*>[\s\S]*?<\/span>/i, `<span class="text-[12px] text-outline font-medium" id="p-volume">${product.volume}</span>`);
    }
    if (product.clinical_badge) {
      html = html.replace(/<span id="p-badge"[^>]*>[\s\S]*?<\/span>/i, `<span id="p-badge">${product.clinical_badge}</span>`);
    }
    if (product.price_npr) {
      html = html.replace(/<span[^>]*id="p-price"[^>]*>[\s\S]*?<\/span>/i, `<span class="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide uppercase" id="p-price">NPR ${Number(product.price_npr).toLocaleString()}</span>`);
    }

    // Replace Potency Marker & AEO Clinical Summary
    let activesText = product.title;
    try {
      const parsedActives = JSON.parse(product.active_ingredients);
      if (Array.isArray(parsedActives)) {
        activesText = parsedActives.map(a => typeof a === 'string' ? a : (a.name || a.label || '')).filter(Boolean).slice(0, 3).join(' + ');
      }
    } catch (_) {}
    html = html.replace(/<p[^>]*id="p-potency"[^>]*>[\s\S]*?<\/p>/i, `<p class="text-[13px] font-semibold text-primary" id="p-potency">${activesText || product.title}</p>`);
    html = html.replace(/<strong id="p-aeo-title">[\s\S]*?<\/strong>/i, `<strong id="p-aeo-title">${product.title}</strong>`);
    html = html.replace(/<span id="p-aeo-desc">[\s\S]*?<\/span>/i, `<span id="p-aeo-desc">is a doctor-formulated clinical face care solution designed to deliver measurable results while maintaining skin barrier integrity. ${product.summary || ''}</span>`);
    html = html.replace(/<span id="p-aeo-actives">[\s\S]*?<\/span>/i, `<span id="p-aeo-actives">Actives: ${activesText || product.title}</span>`);

    if (product.image_url) {
      const rootImg = product.image_url.startsWith('/') ? product.image_url : `/${product.image_url}`;
      let gallery = [rootImg];
      try {
        if (product.gallery_images) {
          const parsedG = JSON.parse(product.gallery_images);
          if (Array.isArray(parsedG) && parsedG.length) {
            gallery = parsedG.map(u => u.startsWith('/') || u.startsWith('http') ? u : '/' + u);
          }
        }
      } catch (_) {}
      if (gallery.length === 1) {
        gallery.push(rootImg.replace('.jpg', '-banner.jpg'));
        gallery.push('/assets/images/img_9f7d04f58a04.jpg');
      }

      const safeTitle = (product.title || '').replace(/"/g, '&quot;');
      const thumbnailsHtml = gallery.map((imgUrl, idx) => `
<button class="thumbnail-btn rounded-xl aspect-square overflow-hidden bg-white border border-outline-variant/40 shadow-2xs ${idx === 0 ? 'ring-2 ring-primary' : 'hover:opacity-90'} p-1.5 flex items-center justify-center transition-all cursor-pointer" onclick="switchGallery('${imgUrl}', this)" type="button">
  <img alt="${safeTitle} thumbnail ${idx + 1}" class="w-full h-full object-contain" src="${imgUrl}" onerror="this.onerror=null; this.src='/assets/images/cderma-logo.png';" loading="lazy" decoding="async">
</button>`).join('') + `
<div class="rounded-xl aspect-square w-full h-full bg-surface-container-high/60 flex flex-col items-center justify-center p-2 text-center border border-outline-variant/40">
  <span class="material-symbols-outlined text-secondary text-[22px]">biotech</span>
  <span class="text-[10.5px] font-semibold uppercase tracking-wider text-on-surface mt-0.5">Lab Sealed</span>
  <span class="text-[10px] text-outline">pH 5.45</span>
</div>`;

      html = html.replace(/<img[^>]*id="main-product-img"[^>]*>/i, `<img alt="${safeTitle}" class="max-h-[300px] sm:max-h-[360px] md:max-h-[390px] w-auto h-full object-contain transition-transform duration-500 group-hover:scale-105" id="main-product-img" src="${gallery[0] || rootImg}" onerror="this.onerror=null; this.src='/assets/images/cderma-logo.png';" decoding="async">`);
      html = html.replace(/<div class="grid grid-cols-4 gap-2.5 sm:gap-3" id="product-thumbnails-grid">[\s\S]*?<\/div>\s*<!-- Ambient Mini Guarantee Strip -->/i, `<div class="grid grid-cols-4 gap-2.5 sm:gap-3" id="product-thumbnails-grid">${thumbnailsHtml}\n</div>\n<!-- Ambient Mini Guarantee Strip -->`);
      html = html.replace(/<img[^>]*id="floating-product-img"[^>]*>/i, `<img alt="${safeTitle}" id="floating-product-img" class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain bg-white shadow-2xs shrink-0 p-0.5 border border-outline-variant/40" src="${gallery[0] || rootImg}" onerror="this.onerror=null; this.src='/assets/images/cderma-logo.png';" loading="lazy" decoding="async">`);
      html = html.replace(/<p[^>]*id="floating-product-title"[^>]*>[\s\S]*?<\/p>/i, `<p class="font-semibold text-[12.5px] sm:text-[13.5px] text-on-surface leading-tight truncate" id="floating-product-title">${safeTitle}</p>`);
    }

    res.send(html);
  } catch (err) {
    console.error('Error generating dynamic product SEO page:', err);
    res.sendFile(detailFile);
  }
});

app.get('/science', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/science.html', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));

app.get('/b2b', (req, res) => res.sendFile(path.join(__dirname, 'b2b.html')));
app.get('/b2b.html', (req, res) => res.sendFile(path.join(__dirname, 'b2b.html')));

app.get('/clinics', (req, res) => res.sendFile(path.join(__dirname, 'clinics.html')));
app.get('/clinics.html', (req, res) => res.sendFile(path.join(__dirname, 'clinics.html')));

app.get('/monographs', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/monographs.html', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/doctors-advice', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));

// AI & LLM Discovery Endpoints (llms.txt standard)
app.get('/llms.txt', (req, res) => {
  const llmsPath = path.join(__dirname, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.sendFile(llmsPath);
  }
  try {
    const { generateAll } = require('./src/services/llmsGenerator');
    generateAll().then(result => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(result.llmsTxt);
    }).catch(err => {
      res.status(500).type('text/plain').send('# Error generating llms.txt: ' + err.message);
    });
  } catch (err) {
    res.status(404).type('text/plain').send('# llms.txt not found');
  }
});

app.get('/llms-full.txt', (req, res) => {
  const fullPath = path.join(__dirname, 'llms-full.txt');
  if (fs.existsSync(fullPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.sendFile(fullPath);
  }
  try {
    const { generateAll } = require('./src/services/llmsGenerator');
    generateAll().then(result => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(result.llmsFullTxt);
    }).catch(err => {
      res.status(500).type('text/plain').send('# Error generating llms-full.txt: ' + err.message);
    });
  } catch (err) {
    res.status(404).type('text/plain').send('# llms-full.txt not found');
  }
});

// SEO Endpoints: robots.txt and dynamic sitemap.xml
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  try {
    const db = require('./src/config/db');
    const products = db.prepare("SELECT slug, title, image_url, updated_at FROM products WHERE status = 'active' ORDER BY id ASC").all();
    const today = new Date().toISOString().split('T')[0];
    const baseUrl = (process.env.SITE_URL || 'https://cdermanepal.com').replace(/\/+$/, '');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static pages
    const staticPages = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly', title: 'CDerma Nepal Doctor Recommended Skincare Logo', img: `${baseUrl}/assets/images/cderma-logo.png` },
      { loc: `${baseUrl}/products.html`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/science.html`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/b2b.html`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${baseUrl}/clinics.html`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/monographs.html`, priority: '0.8', changefreq: 'weekly' }
    ];

    staticPages.forEach(p => {
      xml += `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n`;
      if (p.img) {
        xml += `    <image:image>\n      <image:loc>${p.img}</image:loc>\n      <image:title>${p.title}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    });

    // Dynamic active products
    products.forEach(prod => {
      const prodImg = prod.image_url ? (prod.image_url.startsWith('http') ? prod.image_url : `${baseUrl}/${prod.image_url.replace(/^\//, '')}`) : `${baseUrl}/assets/images/cderma-logo.png`;
      xml += `  <url>\n    <loc>${baseUrl}/products/${encodeURIComponent(prod.slug)}</loc>\n    <lastmod>${prod.updated_at ? prod.updated_at.split(' ')[0] : today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n`;
      xml += `    <image:image>\n      <image:loc>${prodImg}</image:loc>\n      <image:title>${prod.title.replace(/[<>&'"]/g, '')}</image:title>\n    </image:image>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    res.type('application/xml').send(xml);
  } catch (err) {
    res.type('application/xml').sendFile(path.join(__dirname, 'sitemap.xml'));
  }
});

// Canonical Public Web Pages
app.get('/cleanroom', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/cleanroom.html', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 404 handler (API routes return JSON, Web requests return 404 page)
app.use((req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/admin/api/')) {
    return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'API resource not found.' });
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Central Error Handler (prevents stack traces & internal error leakage)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: 'INTERNAL_ERROR',
    message: isProduction ? 'An internal error occurred. Please try again later.' : err.message
  });
});

// Start Server
async function startServer() {
  try {
    await initDatabase();

    // Initialize or refresh LLMs.txt files on startup
    try {
      const { generateAll } = require('./src/services/llmsGenerator');
      await generateAll();
    } catch (e) {
      console.warn('Initial LLMs.txt generation notice:', e.message);
    }

    app.listen(PORT, () => {
      console.log(`🌿 CDerma Nepal Full-Stack Node.js Application active on port ${PORT}`);
      console.log(`🌐 Public Website: http://localhost:${PORT}`);
      console.log(`⚙️  Admin CMS:    http://localhost:${PORT}/admin`);
      console.log(`🔐 Default Login: admin / cderma2026! (configure in .env)`);
    });
  } catch (err) {
    console.error('Fatal error initializing server database:', err);
    process.exit(1);
  }
}

startServer();

