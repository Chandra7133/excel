// createExcelIfNotExists.js
const fs = require('fs');
const path = require('path');
const os = require('os');
const XLSX = require('xlsx');

function createExcelIfNotExists() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const fileName = `${dd}${mm}${yyyy}.xlsx`;

  const filePath = path.join(os.homedir(), 'Documents', fileName);

  if (fs.existsSync(filePath)) {
    console.log('File already exists:', filePath);
  } else {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filePath);
    console.log('File created:', filePath);
  }
}

module.exports = createExcelIfNotExists;
