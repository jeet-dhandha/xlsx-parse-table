function convertExcelRangeToNumber(range) {
  const match = range.match(/([A-Z]+)(\d+)/);
  if (!match) return [-1, -1];

  const [, colStr, rowStr] = match;
  const col = colStr.split("").reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 65, 0);

  return [parseInt(rowStr) - 1, col];
}

function worksheetToArray(worksheet) {
  const cells = Object.entries(worksheet).filter(([cell]) => cell.match(/^[A-Z]+[0-9]+$/));

  const [maxRow, maxCol] = cells.reduce(
    ([maxR, maxC], [cell]) => {
      const [row, col] = convertExcelRangeToNumber(cell);
      return [Math.max(maxR, row), Math.max(maxC, col)];
    },
    [-1, -1]
  );

  const grid = Array(maxRow + 1)
    .fill()
    .map(() => Array(maxCol + 1).fill(""));

  cells.forEach(([cell, value]) => {
    const [row, col] = convertExcelRangeToNumber(cell);
    grid[row][col] = value.v || "";
  });

  return grid;
}

function extractTables(worksheet) {
  const grid = worksheetToArray(worksheet);
  return splitTables(grid);
}

function splitTables(grid) {
  const tables = [];
  let currentTable = null;

  // Split vertically
  for (let row = 0; row < grid.length; row++) {
    const hasContent = grid[row].some((cell) => cell !== "");

    if (hasContent) {
      if (!currentTable) currentTable = { start: row, end: row };
      else currentTable.end = row;
    } else if (currentTable) {
      tables.push(extractSubTable(grid, currentTable));
      currentTable = null;
    }
  }
  if (currentTable) tables.push(extractSubTable(grid, currentTable));

  // Split horizontally
  return tables.flatMap((table) => {
    const gaps = [];
    for (let col = 0; col < table[0].length - 1; col++) {
      if (table.every((row) => row[col] === "")) gaps.push(col);
    }

    if (!gaps.length) return [table];

    const subTables = [];
    let startCol = 0;

    for (const gap of gaps) {
      if (gap > startCol) {
        const subTable = table.map((row) => row.slice(startCol, gap)).filter((row) => row.some((cell) => cell !== ""));
        if (subTable.length) subTables.push(subTable);
      }
      startCol = gap + 1;
    }

    if (startCol < table[0].length) {
      const subTable = table.map((row) => row.slice(startCol)).filter((row) => row.some((cell) => cell !== ""));
      if (subTable.length) subTables.push(subTable);
    }

    return subTables;
  });
}

function extractSubTable(grid, { start, end }) {
  let minCol = Infinity,
    maxCol = -1;

  for (let row = start; row <= end; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== "") {
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
      }
    }
  }

  return grid.slice(start, end + 1).map((row) => row.slice(minCol, maxCol + 1));
}

export { extractTables };
