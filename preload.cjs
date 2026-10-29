const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('chatPocket', {
  openChatGPT: () => ipcRenderer.send('chatpocket:open-chatgpt')
});