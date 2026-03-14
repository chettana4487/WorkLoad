const xlsx = require('xlsx');

const workbook = xlsx.readFile('D:\\\\Users\\\\chettana_s\\\\Desktop\\\\New folder (2)\\\\New folder\\\\EE Workload_2026_03.xlsx');
console.log("Sheet names:");
console.log(workbook.SheetNames);

const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

console.log("\\nFirst 10 rows of " + firstSheetName + ":");
for (let i = 0; i < Math.min(10, data.length); i++) {
  console.log(data[i]);
}
