function convertExcelRangeToNumber(range) {
  // Convert 'A1' style to [row, col] indices
  const colStr = range.replace(/[0-9]/g, "");
  const rowStr = range.replace(/[^0-9]/g, "");

  // Convert column letters to number (A=0, B=1, etc)
  let col = 0;
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + colStr.charCodeAt(i) - "A".charCodeAt(0);
  }

  return [parseInt(rowStr) - 1, col];
}

function worksheetToArray(worksheet) {
  // Find dimensions
  let maxRow = 0;
  let maxCol = 0;

  Object.keys(worksheet).forEach((cell) => {
    if (cell.match(/^[A-Z]+[0-9]+$/)) {
      const [row, col] = convertExcelRangeToNumber(cell);
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
    }
  });

  // Create 2D array
  const result = Array(maxRow + 1)
    .fill()
    .map(() => Array(maxCol + 1).fill(""));

  // Populate array
  Object.entries(worksheet).forEach(([cell, value]) => {
    if (cell.match(/^[A-Z]+[0-9]+$/)) {
      const [row, col] = convertExcelRangeToNumber(cell);
      result[row][col] = value.v || "";
    }
  });

  return result;
}

module.exports = { worksheetToArray };
