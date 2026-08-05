const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Load the live game from the web so the desktop app shares the exact same
// origin (and therefore localStorage / saved username) as the browser.
// Falls back to the bundled dist/index.html if the web build is unreachable.
const GAME_URL = 'https://blockforge-1.onrender.com/';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    backgroundColor: '#000000',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL(GAME_URL).catch(() => {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
  win.maximize();

  // The game itself lives on the web, so every Render deploy is picked up
  // automatically. Reload when the window regains focus after being idle so a
  // long-running desktop session doesn't sit on a stale build.
  let blurredAt = 0;
  win.on('blur', () => { blurredAt = Date.now(); });
  win.on('focus', () => {
    // Only refresh if the app sat in the background for over 10 minutes,
    // so we never interrupt an active play session.
    if (blurredAt && Date.now() - blurredAt > 10 * 60 * 1000) {
      blurredAt = 0;
      win.webContents.reloadIgnoringCache();
    }
  });

  // Cmd+R / Cmd+Shift+R to force-refresh to the newest deploy on demand.
  win.webContents.on('before-input-event', (event, input) => {
    if (input.meta && input.key.toLowerCase() === 'r') {
      win.webContents.reloadIgnoringCache();
      event.preventDefault();
    }
  });
}

function setupAutoUpdater() {
  if (!app.isPackaged) return;
  try {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('update-available', () => {
      // Downloads automatically in the background (autoDownload = true).
    });

    autoUpdater.on('update-downloaded', () => {
      try {
        dialog.showMessageBox({
          type: 'info',
          title: 'BlockForge updated',
          message: 'A new version of BlockForge was downloaded. It will install the next time you quit the game.',
          buttons: ['OK', 'Restart now'],
          defaultId: 0,
        }).then((r) => {
          if (r.response === 1) autoUpdater.quitAndInstall();
        });
      } catch (_) {}
    });

    autoUpdater.on('error', (err) => {
      console.error('[BlockForge] auto-update error:', err && err.message);
    });

    // Check shortly after launch so the game opens fast.
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch((err) => {
        console.error('[BlockForge] update check failed:', err && err.message);
      });
    }, 3000);
  } catch (e) {
    console.error('[BlockForge] updater init failed:', e);
  }
}

app.whenReady().then(() => {
  createWindow();
  setupAutoUpdater();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
