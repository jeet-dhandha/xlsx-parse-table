import { worksheetToArray } from "./excelUtils.js";

// VERTICAL
function findTableBoundaries(grid) {
  const tables = [];
  let currentTable = null;

  for (let row = 0; row < grid.length; row++) {
    let hasContent = grid[row].some((cell) => cell !== "");

    if (hasContent && !currentTable) {
      currentTable = { startRow: row, endRow: row };
    } else if (hasContent && currentTable) {
      currentTable.endRow = row;
    } else if (!hasContent && currentTable) {
      tables.push(currentTable);
      currentTable = null;
    }
  }

  if (currentTable) {
    tables.push(currentTable);
  }

  return tables;
}

function extractTable(grid, tableInfo) {
  const result = [];
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

  for (let row = tableInfo.startRow; row <= tableInfo.endRow; row++) {
    const tableRow = grid[row].slice(minCol, maxCol + 1);
    result.push(tableRow);
  }

  return result;
}

// HORIZONTAL
function findHorizontalGaps(table) {
  const gaps = [];

  for (let col = 0; col < table[0].length - 1; col++) {
    let isGap = true;

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

function splitTableHorizontally(table) {
  const gaps = findHorizontalGaps(table);
  if (gaps.length === 0) return [table];

  const subTables = [];
  let startCol = 0;

  for (const gap of gaps) {
    if (gap > startCol) {
      const subTable = table.map((row) => row.slice(startCol, gap)).filter((row) => row.some((cell) => cell !== ""));
      subTables.push(subTable);
    }
    startCol = gap + 1;
  }

  if (startCol < table[0].length) {
    const subTable = table.map((row) => row.slice(startCol)).filter((row) => row.some((cell) => cell !== ""));
    subTables.push(subTable);
  }

  return subTables.filter((table) => table.some((row) => row.some((cell) => cell !== "")));
}

// MAIN TABLES
function extractTables(worksheet) {
  const grid = worksheetToArray(worksheet);
  return recursivelyExtractTables([grid]);
}

function recursivelyExtractTables(tables) {
  let newTables = [];

  for (const table of tables) {
    const tableBoundaries = findTableBoundaries(table);
    const verticallySplitTables = tableBoundaries.map((bounds) => extractTable(table, bounds));
    const horizontallySplitTables = verticallySplitTables.flatMap((table) => splitTableHorizontally(table));
    newTables.push(...horizontallySplitTables);
  }

  if (newTables.length > tables.length) {
    return recursivelyExtractTables(newTables);
  }

  return newTables;
}

export { extractTables };
