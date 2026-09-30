-- BlockForge API schema (D1). Run: npm run db:migrate

-- Password/identity accounts (fresh registry; hashes are PBKDF2-SHA256 —
-- the old Node server used scrypt, which Workers can't verify, so accounts
-- were re-created on the Cloudflare cutover).
CREATE TABLE IF NOT EXISTS accounts (
  username TEXT PRIMARY KEY,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'player',
  tag TEXT NOT NULL DEFAULT '',
  identities TEXT NOT NULL DEFAULT '{}'
);

-- Community gallery (skins/textures as data URLs, ≤1.5MB each).
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  data TEXT NOT NULL,
  uploader TEXT NOT NULL,
  date INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_gallery ON gallery(type, date DESC);

-- Community mods metadata (.bfmod bytes live in R2_UPLOADS/community/).
CREATE TABLE IF NOT EXISTS mods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  description TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'Unknown',
  icon TEXT NOT NULL DEFAULT '📦',
  file TEXT NOT NULL,
  uploadedAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);
