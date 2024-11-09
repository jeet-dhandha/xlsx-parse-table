const { worksheetToArray } = require("./excelUtils.js");

// VERTICAL
// Function to find table boundaries in the grid
function findTableBoundaries(grid) {
  const tables = [];
  let currentTable = null;

  for (let row = 0; row < grid.length; row++) {
    let hasContent = grid[row].some((cell) => cell !== "");

    if (hasContent && !currentTable) {
      // Start new table
      currentTable = { startRow: row, endRow: row };
    } else if (hasContent && currentTable) {
      // Extend current table
      currentTable.endRow = row;
    } else if (!hasContent && currentTable) {
      // Empty row - finish current table
      tables.push(currentTable);
      currentTable = null;
    }
  }

  // Add last table if exists
  if (currentTable) {
    tables.push(currentTable);
  }

  return tables;
}

// Function to extract a single table given boundaries
function extractTable(grid, tableInfo) {
  const result = [];

  // Find left and right boundaries
  let minCol = Infinity;
  let maxCol = -1;

  for (let row = tableInfo.startRow; row <= tableInfo.endRow; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== "") {
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
      }
    }
  }

  // Extract table data
  for (let row = tableInfo.startRow; row <= tableInfo.endRow; row++) {
    const tableRow = grid[row].slice(minCol, maxCol + 1);
    result.push(tableRow);
  }

  return result;
}

/// HORIZONTAL
// New function to find horizontal gaps in a table
function findHorizontalGaps(table) {
  const gaps = [];

  // Check each column
  for (let col = 0; col < table[0].length - 1; col++) {
    let isGap = true;

    // Check if entire column is empty
    for (let row = 0; row < table.length; row++) {
      if (table[row][col] !== "") {
        isGap = false;
        break;
      }
    }

    if (isGap) {
      gaps.push(col);
    }
  }

  return gaps;
}

// Function to split table horizontally
function splitTableHorizontally(table) {
  const gaps = findHorizontalGaps(table);
  if (gaps.length === 0) return [table];

  const subTables = [];
  let startCol = 0;

  for (const gap of gaps) {
    if (gap > startCol) {
      const subTable = table.map((row) => row.slice(startCol, gap));
      subTables.push(subTable);
    }
    startCol = gap + 1;
  }

  // Add last section
  if (startCol < table[0].length) {
    const subTable = table.map((row) => row.slice(startCol));
    subTables.push(subTable);
  }

  // Filter out empty tables
  return subTables.filter((table) => table.some((row) => row.some((cell) => cell !== "")));
}

// MAIN TABLES

// Main function to extract all tables
// Updated main function
function extractTables(worksheet) {
  const grid = worksheetToArray(worksheet);
  const tableBoundaries = findTableBoundaries(grid);
  const verticallySplitTables = tableBoundaries.map((bounds) => extractTable(grid, bounds));

  // Split each vertical table horizontally
  const allTables = verticallySplitTables.flatMap((table) => splitTableHorizontally(table));

  return allTables;
}

module.exports = { extractTables };
