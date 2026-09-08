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
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf']);
const ALLOWED_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf'
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

// 3. Post-upload Magic Bytes & Content Inspection Middleware
function verifyUploadedFile(req, res, next) {
  if (!req.file) return next();

  const filePath = req.file.path;
  const ext = path.extname(req.file.filename).toLowerCase();

  try {
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
      // SVG inspection: read entire file and verify zero script / XSS vectors
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

    if (!isValid) {
      try { fs.unlinkSync(filePath); } catch (e) {}
      return res.status(400).json({
        success: false,
        error: 'INVALID_FILE_SIGNATURE',
        message: 'File content does not match the expected format or contains disallowed executable scripts.'
      });
    }

    next();
  } catch (err) {
    try { fs.unlinkSync(filePath); } catch (e) {}
    return res.status(400).json({
      success: false,
      error: 'FILE_INSPECTION_FAILED',
      message: 'Failed to verify uploaded file security.'
    });
  }
}

module.exports = upload;
module.exports.verifyUploadedFile = verifyUploadedFile;
