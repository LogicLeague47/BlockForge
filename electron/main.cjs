const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

const LOCAL_FILE = path.join(__dirname, '..', 'dist', 'index.html');
const CURRENT_VERSION = require('../package.json').version;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    backgroundColor: '#000000',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });
  mainWindow.loadFile(LOCAL_FILE);
  mainWindow.maximize();

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.meta && input.key.toLowerCase() === 'r') {
      mainWindow.webContents.reloadIgnoringCache();
      event.preventDefault();
    }
  });
}

// --- Update IPC handlers ---------------------------------------------------

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'BlockForge-Updater' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'BlockForge-Updater' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve, reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

// Compare semver-like strings: returns true if a > b
function isNewer(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0, nb = pb[i] || 0;
    if (na > nb) return true;
    if (na < nb) return false;
  }
  return false;
}

ipcMain.handle('check-for-update', async () => {
  try {
    const release = await fetchJSON('https://api.github.com/repos/LogicLeague47/BlockForge/releases/latest');
    const remoteVersion = (release.tag_name || '').replace(/^v/i, '');
    if (!remoteVersion || !isNewer(remoteVersion, CURRENT_VERSION)) {
      return { updateAvailable: false };
    }
    const asset = (release.assets || []).find((a) => a.name && a.name.includes('mac') && a.name.endsWith('.dmg'));
    if (!asset) return { updateAvailable: false };
    return {
      updateAvailable: true,
      version: remoteVersion,
      downloadUrl: asset.browser_download_url,
    };
  } catch (_) {
    return { updateAvailable: false };
  }
});

ipcMain.handle('do-update', async (_event, downloadUrl) => {
  const dest = path.join(app.getPath('downloads'), 'BlockForge-mac-arm64.dmg');
  try {
    await downloadFile(downloadUrl, dest);
    exec(`open "${dest}"`);
    setTimeout(() => app.quit(), 500);
  } catch (err) {
    dialog.showErrorBox('Update Failed', 'Could not download the update: ' + (err.message || err));
  }
});

// --- App lifecycle ---------------------------------------------------------

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
