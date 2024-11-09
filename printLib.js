/**
 *
 * @param {Array<Array<string>>} tables
 */
function parseFromTablePathAndShowLogs(tables) {
  function printTable(rows) {
    function getColumnWidths(rows) {
      return rows[0].map((_, colIndex) => Math.max(...rows.map((row) => `${row[colIndex] ?? ""}`.length)) + 2);
    }

    function createTableBorder(columnWidths) {
      return "+-" + columnWidths.map((width) => "-".repeat(width)).join("-+-") + "-+";
    }

    function centerText(cell, width) {
      const text = `${cell}`;
      const space = width - text.length;
      const padLeft = Math.floor(space / 2);
      const padRight = space - padLeft;
      return " ".repeat(padLeft) + text + " ".repeat(padRight);
    }

    function formatRow(row, columnWidths) {
      return "| " + row.map((cell, i) => centerText(cell, columnWidths[i])).join(" | ") + " |";
    }

    // ------------------------------------ MAIN CODE ------------------------------------------

    const columnWidths = getColumnWidths(rows);
    const printLine = () => console.log(createTableBorder(columnWidths));

    printLine();
    rows.forEach((row, index) => {
      console.log(formatRow(row, columnWidths));
      if (index === 0) printLine();
    });
    printLine();
  }

  // Usage example
  // Usage
  // const filePath = "./AL SAGR INS - AIB BOOK PREMIUM (1).xls";
  // const filePath = "./tests-example (1).xlsx";

  console.log(`\n================================================================================`);
  console.log(`Found ${tables.length} tables:`);
  console.log(`================================================================================\n`);

  tables.forEach((table, index) => {
    console.log(`Table ${index + 1}:`);
    console.log(`  Number of rows: ${table.length}`);
    console.log(`  Number of columns: ${table[0].length}`);
    console.log("  Sample data:");

    const sampleRows = [...table.slice(0, Math.min(6, table.length)), ...(table.length > 12 ? table.slice(-6) : [])];
    printTable(sampleRows);
    console.log("\n");
  });
  console.log(`|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n`);
}

module.exports = { parseFromTablePathAndShowLogs };
