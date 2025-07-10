const fs = require('fs');
const path = require('path');
const os = require('os');
const XLSX = require('xlsx');

const getFilePath = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const fileName = `${dd}${mm}${yyyy}.xlsx`;
  return path.join(os.homedir(), 'Documents', fileName);
};

const readData = () => {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) return [];
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
};

const writeData = (data) => {
  const filePath = getFilePath();
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filePath);
};

// CRUD Methods

const getAll = () => readData();

const getById = (id) => {
  const data = readData();
  return data.find((item) => item.id === id);
};

const create = (newItem) => {
  const data = readData();
  newItem.id = Date.now(); // Simple ID logic
  data.push(newItem);
  writeData(data);
  return newItem;
};

const update = (id, updatedItem) => {
  let data = readData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updatedItem };
  writeData(data);
  return data[index];
};

const remove = (id) => {
  let data = readData();
  const newData = data.filter((item) => item.id !== id);
  writeData(newData);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
