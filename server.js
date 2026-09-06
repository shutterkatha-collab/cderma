require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/db');

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

// Fallback static files
app.use(express.static(path.join(__dirname, '.')));

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌿 CDerma Nepal Full-Stack Node.js Application active on port ${PORT}`);
  console.log(`🌐 Public Website: http://localhost:${PORT}`);
  console.log(`⚙️  Admin CMS:    http://localhost:${PORT}/admin`);
  console.log(`🔐 Default Login: admin / cderma2026! (configure in .env)`);
});
