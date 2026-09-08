/**
 * CDerma Nepal — Automated Database Backup & Disaster Recovery Service
 * Periodically creates timestamped snapshots of SQLite database into a private storage directory.
 * Enforces strict retention policy (prunes older than 7 copies).
 */

const fs = require('fs');
const path = require('path');

const BACKUP_DIR = path.resolve(__dirname, '../../storage/backups');
const MAX_BACKUPS = 7;

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 });
  }
}

/**
 * Creates a timestamped snapshot of the current SQLite database
 * @param {object} rawDbInstance - raw sql.js Database instance or export function
 * @returns {object} metadata
 */
function createDatabaseBackup(rawDbInstance) {
  ensureBackupDir();

  let dataBuffer = null;
  if (rawDbInstance && typeof rawDbInstance.export === 'function') {
    dataBuffer = Buffer.from(rawDbInstance.export());
  } else {
    const mainDbPath = path.resolve(__dirname, '../../database.sqlite');
    if (fs.existsSync(mainDbPath)) {
      dataBuffer = fs.readFileSync(mainDbPath);
    }
  }

  if (!dataBuffer || dataBuffer.length === 0) {
    throw new Error('Database buffer is empty. Cannot create backup.');
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `cderma-backup-${timestamp}.sqlite`;
  const targetPath = path.join(BACKUP_DIR, filename);

  fs.writeFileSync(targetPath, dataBuffer, { mode: 0o600 });
  pruneOldBackups();

  return {
    filename,
    bytes: dataBuffer.length,
    timestamp: new Date().toISOString(),
    path: targetPath
  };
}

/**
 * Enforce retention policy: keeps at most MAX_BACKUPS snapshots
 */
function pruneOldBackups() {
  try {
    ensureBackupDir();
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('cderma-backup-') && f.endsWith('.sqlite'))
      .map(f => {
        const fullPath = path.join(BACKUP_DIR, f);
        const stats = fs.statSync(fullPath);
        return { name: f, path: fullPath, mtime: stats.mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);

    if (files.length > MAX_BACKUPS) {
      const toDelete = files.slice(MAX_BACKUPS);
      for (const item of toDelete) {
        fs.unlinkSync(item.path);
      }
    }
  } catch (err) {
    console.error('Failed to prune old backups:', err.message);
  }
}

/**
 * List all available backups
 */
function listBackups() {
  ensureBackupDir();
  return fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('cderma-backup-') && f.endsWith('.sqlite'))
    .map(f => {
      const fullPath = path.join(BACKUP_DIR, f);
      const stats = fs.statSync(fullPath);
      return {
        filename: f,
        bytes: stats.size,
        created_at: stats.mtime.toISOString()
      };
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

module.exports = {
  createDatabaseBackup,
  listBackups,
  BACKUP_DIR
};
