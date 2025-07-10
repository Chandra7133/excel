const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('excelAPI', {
  getAll: () => ipcRenderer.invoke('excel:getAll'),
  getById: (id) => ipcRenderer.invoke('excel:getById', id),
  create: (data) => ipcRenderer.invoke('excel:create', data),
  update: (id, data) => ipcRenderer.invoke('excel:update', id, data),
  remove: (id) => ipcRenderer.invoke('excel:remove', id),
});
