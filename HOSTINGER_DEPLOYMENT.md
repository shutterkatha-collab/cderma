# CDerma Nepal — Hostinger Business Deployment Guide

This full-stack Node.js application is pre-configured for deployment on **Hostinger Business Web Hosting** using Hostinger's native **Node.js Application Manager** or Cloud hosting.

---

## Architecture Overview
- **Runtime**: Node.js (v18.x, v20.x, or v22.x)
- **Framework**: Express.js
- **Entry File**: `server.js`
- **Database**: SQLite (`database.sqlite`) out of the box; easily switchable to Hostinger managed MySQL if preferred.
- **Admin Panel**: Accessible at `/admin` (Secure session login with bcrypt authentication).

---

## Step-by-Step Hostinger Deployment

### Step 1: Compress the Project Files
Create a `.zip` archive of the project excluding `node_modules` and local log files:

```bash
zip -r cderma-production.zip . -x "node_modules/*" ".git/*" ".env" "*.log"
```

---

### Step 2: Configure Node.js in Hostinger hPanel
1. Log in to your [Hostinger hPanel](https://hpanel.hostinger.com).
2. Under **Websites**, select your domain and click **Dashboard**.
3. In the search bar or left sidebar, navigate to **Advanced** → **Node.js**.
4. Configure the application settings:
   - **Node.js version**: `20.x` or `22.x`
   - **Application mode**: `Production`
   - **Application root**: `public_html` (or your subdirectory if using a subdomain)
   - **Application startup file**: `server.js`
5. Click **Create** or **Save**.

---

### Step 3: Upload Files via File Manager or Git
1. Go to **Files** → **File Manager**.
2. Navigate to `public_html/`.
3. Upload `cderma-production.zip` and extract its contents into `public_html/`.
4. Ensure `server.js`, `package.json`, and `public/` are directly inside `public_html/`.

---

### Step 4: Configure Production Environment Variables (`.env`)
In `public_html/`, create a file named `.env`:

```env
PORT=3000
NODE_ENV=production
SESSION_SECRET=create_a_long_random_secret_here_e_g_cderma_prod_987654321
ADMIN_USER=cderma_admin
ADMIN_PASS=YourSecurePasswordHere!
UPLOAD_DIR=public/uploads
```

---

### Step 5: Install Dependencies & Launch
1. In the Hostinger **Node.js** panel, click **Run NPM Install** (or access SSH and run `npm install --production`).
2. Click **Start Application** or **Restart**.
3. Your application is now live on your domain!

---

## Accessing the CMS Backend
- **Public Website**: `https://yourdomain.com`
- **CMS Admin Panel**: `https://yourdomain.com/admin`
- **Default Credentials** (before changing in `.env`):
  - **Username**: `admin`
  - **Password**: `cderma2026!`

---

## What You Can Manage in the CMS
1. **Site Copy & Headlines**: Edit hero headlines, brand narrative, cleanroom certifications, and phone/email contacts with 1 click.
2. **Products & Formulations**: Add/edit/delete products, configure prices, volume, active ingredients (%), full INCI lists, and upload product bottle imagery.
3. **Authorized Clinics Directory**: Add and manage hospital dispensaries and dermatology clinics across Nepal.
4. **Clinical Monographs**: Publish medical guidelines and prescribing protocols.
5. **B2B Wholesale Portal**: Review incoming clinic applications, inspect PAN/DDA credentials, and update approval statuses.
6. **Inquiries**: Review messages from practitioners and patients.
