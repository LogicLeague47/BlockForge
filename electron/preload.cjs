const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkForUpdate: () => ipcRenderer.invoke('check-for-update'),
  doUpdate: (url) => ipcRenderer.invoke('do-update', url),
  isElectron: true,
});
