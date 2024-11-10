function findConnectedRegions(grid) {
  const visited = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(false));
  const regions = [];

  function flood(row, col, region) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;
    if (visited[row][col] || grid[row][col] === "") return;

    visited[row][col] = true;
    region.cells.push([row, col]);
    region.bounds = {
      minRow: Math.min(region.bounds.minRow, row),
      maxRow: Math.max(region.bounds.maxRow, row),
      minCol: Math.min(region.bounds.minCol, col),
      maxCol: Math.max(region.bounds.maxCol, col),
    };

    // Check all 8 directions
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        flood(row + dr, col + dc, region);
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (!visited[row][col] && grid[row][col] !== "") {
        const region = {
          cells: [],
          bounds: {
            minRow: Infinity,
            maxRow: -Infinity,
            minCol: Infinity,
            maxCol: -Infinity,
          },
        };
        flood(row, col, region);
        regions.push(region);
      }
    }
  }

  return regions;
}

function extractRegionAsTable(grid, region) {
  const { minRow, maxRow, minCol, maxCol } = region.bounds;
  const table = [];

  for (let row = minRow; row <= maxRow; row++) {
    const tableRow = [];
    for (let col = minCol; col <= maxCol; col++) {
      tableRow.push(grid[row][col]);
    }
    table.push(tableRow);
  }

  return table;
}

function splitTables(grid) {
  if (!grid.length || !grid[0].length) return [];

  const regions = findConnectedRegions(grid);
  return regions.map((region) => extractRegionAsTable(grid, region));
}

// ---------------------------------------------------------------------------------

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

export { extractTables };
