const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Load from bundled local files so localStorage (worlds, accounts, settings)
// is stored in the Electron user-data directory and persists across DMG rebuilds.
// The bundled build connects to the same multiplayer server as the web version.
const LOCAL_FILE = path.join(__dirname, '..', 'dist', 'index.html');

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
  win.loadFile(LOCAL_FILE);
  win.maximize();

  // Cmd+R to force-refresh the bundled build.
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
