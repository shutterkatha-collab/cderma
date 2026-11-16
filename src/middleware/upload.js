const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDir = path.resolve(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Storage Engine with Cryptographically Random Identifiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    // Cryptographically secure random identifier (prevents path traversal & filename collision)
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, `${randomName}${ext}`);
  }
});

// 2. Pre-filter by file extension & MIME type
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf', '.avif']);
const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'application/pdf',
  'application/octet-stream' // sometimes sent by mobile webview for raw images
]);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.has(ext) && ALLOWED_MIMES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, PNG, WebP, SVG, and PDF files are permitted.'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum file size
    files: 1
  },
  fileFilter
});

const uploadMultiple = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 12
  },
  fileFilter
});

function inspectSingleFile(filePath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const buffer = Buffer.alloc(512);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 512, 0);
  fs.closeSync(fd);

  let isValid = false;

  if (ext === '.jpg' || ext === '.jpeg') {
    isValid = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
  } else if (ext === '.png') {
    isValid = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  } else if (ext === '.webp') {
    isValid = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  } else if (ext === '.pdf') {
    isValid = buffer.toString('ascii', 0, 4) === '%PDF';
  } else if (ext === '.svg') {
    const content = fs.readFileSync(filePath, 'utf8');
    const isXmlOrSvg = /^\s*(<\?xml|<svg)/i.test(content);
    const hasScriptTag = /<script\b/i.test(content);
    const hasEventHandlers = /\son\w+\s*=/i.test(content);
    const hasJsUri = /javascript\s*:/i.test(content);
    const hasForeignObject = /<foreignObject\b/i.test(content);
    const hasIframe = /<iframe\b/i.test(content);

    if (isXmlOrSvg && !hasScriptTag && !hasEventHandlers && !hasJsUri && !hasForeignObject && !hasIframe) {
      isValid = true;
    }
  }

  return isValid;
}

// 3. Post-upload Magic Bytes & Content Inspection Middleware (supports single & multiple files)
function verifyUploadedFile(req, res, next) {
  const files = [];
  if (req.file) files.push(req.file);
  if (Array.isArray(req.files)) files.push(...req.files);
  else if (req.files && typeof req.files === 'object') {
    Object.values(req.files).forEach(fList => {
      if (Array.isArray(fList)) files.push(...fList);
      else if (fList) files.push(fList);
    });
  }

  if (files.length === 0) return next();

  try {
    for (const f of files) {
      const ok = inspectSingleFile(f.path, f.filename);
      if (!ok) {
        files.forEach(item => {
          try { fs.unlinkSync(item.path); } catch (_) {}
        });
        return res.status(400).json({
          success: false,
          error: 'INVALID_FILE_SIGNATURE',
          message: 'One or more files have invalid signatures or contain disallowed executable scripts.'
        });
      }
    }
    next();
  } catch (err) {
    files.forEach(item => {
      try { fs.unlinkSync(item.path); } catch (_) {}
    });
    return res.status(400).json({
      success: false,
      error: 'FILE_INSPECTION_FAILED',
      message: 'Failed to verify uploaded file security.'
    });
  }
}

module.exports = upload;
module.exports.upload = upload;
module.exports.uploadMultiple = uploadMultiple;
module.exports.verifyUploadedFile = verifyUploadedFile;
module.exports.verifyUploadedFiles = verifyUploadedFile;
