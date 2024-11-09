// Published as NPM Library
const XLSX = require("xlsx");

const { extractTables } = require("./xlsxParserLib");
/**
 * @typedef Table
 * @type {Array<string>}
 */
// Current file - index.js

/**
 * Parse tables and return as Array of Tables
 * @param {string} path
 * @returns {Array<Table>}
 */
const parse = (path) => {
  const workbook = XLSX.readFile(path, { sheets: 0, type: "array" });
  const sheet_name_list = workbook.SheetNames;
  return extractTables(workbook.Sheets[sheet_name_list[0]]);
};

module.exports = { parse };
