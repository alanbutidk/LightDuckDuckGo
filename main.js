const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { DDGS } = require('@phukon/duckduckgo-search');
const path = require('path');
Menu.setApplicationMenu(null);

function createWindow() {
    const win = new BrowserWindow({
        width: 1280, height: 800,
        backgroundColor: '#000000',
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true // MUST BE TRUE
        }
    });
    win.loadFile('index.html');
}

ipcMain.handle('perform-search', async (event, query) => {
    try {
        const ddgs = new DDGS();
        return await ddgs.text({ keywords: query, maxResults: 5 });
    } catch (e) { return []; }
});

app.whenReady().then(createWindow);
