// Published as NPM Library
import { extractTables } from "./xlsxParserLib";

/**
 * @typedef Table
 * @type {Array<string>}
 */
// Current file - index.js

/**
 * Parse tables and return as Array of Tables
 * @param {Object} worksheet
 * @returns {Array<Table>}
 */
const parse = (worksheet) => {
  return extractTables(worksheet);
};

export default { parse };
