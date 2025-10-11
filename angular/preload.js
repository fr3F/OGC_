// preload.js
const { contextBridge } = require('electron');
const os = require('os');

// Expose une API sécurisée à Angular
contextBridge.exposeInMainWorld('electronAPI', {
  getUsername: () => os.userInfo().username
});
