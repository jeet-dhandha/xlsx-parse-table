# @libs-jd/xlsx-parse-table

> A library to parse tables from Excel worksheets.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save @libs-jb/xlsx-parse-table xlsx
```

## Usage

Works with Excel files.

# Example - Node.js

```js
const xlsx = require("xlsx");
const workbook = xlsx.readFile("path/to/excel-file.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const { parse } = require("@libs-jb/xlsx-parse-table");
const tables = parse(worksheet);

console.log(tables);
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

### Related projects

You might also be interested in these projects:

- [xlsx](https://www.npmjs.com/package/xlsx): A library to parse and write Excel files. | [homepage](https://github.com/SheetJS/sheetjs "A library to parse and write Excel files.")

### Contributors

| **Commits** | **Contributor**                                 |
| ----------- | ----------------------------------------------- |
| 1           | [jeet-dhandha](https://github.com/jeet-dhandha) |

### Author

**Jeet Dhandha**

- [LinkedIn Profile](https://linkedin.com/in/jeet-dhandha)
- [GitHub Profile](https://github.com/jeet-dhandha)

### License

Released under the [MIT License](LICENSE).
