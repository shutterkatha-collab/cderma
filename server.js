require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { db, initDatabase } = require('./src/config/db');

const apiRoutes = require('./src/routes/api');
const adminRoutes = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & Body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session for Admin authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'cderma_nepal_clinical_botanical_luxury_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && process.env.FORCE_HTTPS === 'true'
  }
}));

// Security and SEO Header Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Static Asset Directories
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Public APIs
app.use('/api', apiRoutes);

// Admin CMS
app.use('/admin', adminRoutes);

// Clean Route Handlers for Public Web Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));

app.get('/product-detail', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/product-detail.html', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/products/:slug', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));

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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static pages
    const staticPages = [
      { loc: 'https://cderma.com.np/', priority: '1.0', changefreq: 'weekly', title: 'CDerma Nepal Doctor Recommended Skincare Logo', img: 'https://cderma.com.np/assets/images/cderma-logo.png' },
      { loc: 'https://cderma.com.np/products.html', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/product-detail.html', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/science.html', priority: '0.8', changefreq: 'monthly' },
      { loc: 'https://cderma.com.np/b2b.html', priority: '0.85', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/clinics.html', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/monographs.html', priority: '0.8', changefreq: 'weekly' }
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
      const prodImg = prod.image_url ? (prod.image_url.startsWith('http') ? prod.image_url : `https://cderma.com.np/${prod.image_url.replace(/^\//, '')}`) : 'https://cderma.com.np/assets/images/cderma-logo.png';
      xml += `  <url>\n    <loc>https://cderma.com.np/products/${encodeURIComponent(prod.slug)}</loc>\n    <lastmod>${prod.updated_at ? prod.updated_at.split(' ')[0] : today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n`;
      xml += `    <image:image>\n      <image:loc>${prodImg}</image:loc>\n      <image:title>${prod.title.replace(/[<>&'"]/g, '')}</image:title>\n    </image:image>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    res.type('application/xml').send(xml);
  } catch (err) {
    res.type('application/xml').sendFile(path.join(__dirname, 'sitemap.xml'));
  }
});

// Fallback static files
app.use(express.static(path.join(__dirname, '.')));

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
async function startServer() {
  try {
    await initDatabase();
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

