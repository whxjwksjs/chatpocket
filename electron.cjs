const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('node:path');

// The portable build stores its profile beside the executable (USB/folder friendly).
// Installed builds keep Electron's normal per-user profile location.
if (process.env.PORTABLE_EXECUTABLE_DIR) {
  app.setPath('userData', path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'ChatPocketData'));
}

let mainWindow;
let chatWindow;

function createChatWindow() {
  if (chatWindow && !chatWindow.isDestroyed()) {
    chatWindow.show();
    chatWindow.focus();
    return;
  }

  chatWindow = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'ChatGPT · ChatPocket',
    backgroundColor: '#202123',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      partition: 'persist:chatpocket-chatgpt'
    }
  });

  chatWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url);
    return { action: 'deny' };
  });

  chatWindow.on('closed', () => { chatWindow = null; });
  chatWindow.loadURL('https://chatgpt.com/').catch(() => {
    if (chatWindow && !chatWindow.isDestroyed()) {
      shell.openExternal('https://chatgpt.com/');
      chatWindow.close();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 820,
    minWidth: 760,
    minHeight: 560,
    title: 'ChatPocket',
    backgroundColor: '#111318',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://chatgpt.com/')) createChatWindow();
    else if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

ipcMain.on('chatpocket:open-chatgpt', () => createChatWindow());

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});