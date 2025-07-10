const { app, BrowserWindow } = require('electron');
const path = require('path');
const fileHandler = require('./file');
const { ipcMain } = require('electron');
const CURD = require('./curd');
function createWindow() {
 const win = new BrowserWindow({
  width: 900,
  height: 500,
  webPreferences: {
   preload: path.join(__dirname, 'preload.js'),
   nodeIntegration: false,
   contextIsolation: true,
  }
 });
 // Load Angular output (from dist)
 win.loadFile(path.join(__dirname, 'dist/excel/index.html'));
}
app.commandLine.appendSwitch('disable-gpu');
app.whenReady().then(() => {
 fileHandler();
 createWindow();
});
ipcMain.handle('excel:getAll', () => CURD.getAll());
ipcMain.handle('excel:getById', (event, id) => CURD.getById(id));
ipcMain.handle('excel:create', (event, data) => CURD.create(data));
ipcMain.handle('excel:update', (event, id, data) => CURD.update(id, data));
ipcMain.handle('excel:remove', (event, id) => CURD.remove(id));
