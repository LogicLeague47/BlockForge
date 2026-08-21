// Builds the downloadable BlockForge server package.
// Copies the real server.js + src/profanity.js (single source of truth) into
// server-package/, then zips the whole folder to public/downloads/blockforge-server.zip.
import { copyFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkg = join(root, 'server-package');
const outDir = join(root, 'public', 'downloads');
const outZip = join(outDir, 'blockforge-server.zip');

mkdirSync(join(pkg, 'src'), { recursive: true });
mkdirSync(outDir, { recursive: true });

// Copy the live server sources so the package always matches the game.
copyFileSync(join(root, 'server.js'), join(pkg, 'server.js'));
copyFileSync(join(root, 'src', 'profanity.js'), join(pkg, 'src', 'profanity.js'));

// Remove any stale zip, then create a fresh one (zip is available on macOS/Linux).
if (existsSync(outZip)) rmSync(outZip);
execSync(`zip -r -q "${outZip}" . -x "node_modules/*" "*.zip"`, { cwd: pkg });

console.log('Wrote', outZip);
