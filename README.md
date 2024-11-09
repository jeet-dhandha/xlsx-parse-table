<div align="center"><img width="33%" src="info.png" />
</div>
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

### Sample Files

- [dummy-with-mer-mec-6-out.xlsx](https://github.com/user-attachments/files/17686507/dummy-with-mer-mec-6-out.xlsx)

<details>
  <summary>Output</summary>

```txt
Table 1:
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+
|  Sr. No.  |      Email       |   Name    |  Age  |  Promoted  |  ID   |  Joining Date  |  Termination Date  |
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+
|     1     |  jeet@gmail.com  |  Jeet D.  |  26   |            |  EM1  |     45353      |       45537        |
|     2     |  john@gmail.com  |  John D.  |  25   |            |  EM2  |     45373      |       45732        |
|     3     |  adi@gmail.com   |  Adi. D.  |  25   |            |  EM3  |     45598      |       45607        |
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+


Table 2:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
+-----------+---------+-----------+


Table 3:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
|     3     |   EM3   |  1400000  |
+-----------+---------+-----------+


Table 4:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
+-----------+---------+-----------+


Table 5:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
+-----------+---------+-----------+


Table 6:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
|     3     |   EM3   |  1400000  |
+-----------+---------+-----------+
```

</details>
  
- [dummy-with-ser-noec-2-out.xlsx](https://github.com/user-attachments/files/17686508/dummy-with-ser-noec-2-out.xlsx)

<details>
  <summary>Output</summary>

```txt
Table 1:
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+
|  Sr. No.  |      Email       |   Name    |  Age  |  Promoted  |  ID   |  Joining Date  |  Termination Date  |
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+
|     1     |  jeet@gmail.com  |  Jeet D.  |  26   |            |  EM1  |     45353      |       45537        |
|     2     |  jogn@gmail.com  |  John D.  |  25   |            |  EM2  |     45373      |       45732        |
|     3     |  adi@gmail.com   |  Adi. D.  |  25   |            |  EM3  |     45598      |       45607        |
+-----------+------------------+-----------+-------+------------+-------+----------------+--------------------+


Table 2:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
|     3     |   EM3   |  1400000  |
+-----------+---------+-----------+
```

</details>

- [dummy-with-ser-sec-3-out.xlsx](https://github.com/user-attachments/files/17686512/dummy-with-ser-sec-3-out.xlsx)

<details>
  <summary>Output</summary>

```txt
Table 1:
+------------------+-----------+-------+
|      Email       |   Name    |  Age  |
+------------------+-----------+-------+
|  jeet@gmail.com  |  Jeet D.  |  26   |
|  john@gmail.com  |  John D.  |  25   |
|  adi@gmail.com   |  Adi. D.  |  25   |
+------------------+-----------+-------+


Table 2:
+-----------+-------+----------------+--------------------+
|  Sr. No.  |  ID   |  Joining Date  |  Termination Date  |
+-----------+-------+----------------+--------------------+
|     1     |  EM1  |     45353      |       45537        |
|     2     |  EM2  |     45373      |       45732        |
|     3     |  EM3  |     45598      |       45607        |
+-----------+-------+----------------+--------------------+


Table 3:
+-----------+---------+-----------+
|  Sr. No.  |  EM ID  |  Salary   |
+-----------+---------+-----------+
|     1     |   EM1   |  1000000  |
|     2     |   EM2   |  1200000  |
|     3     |   EM3   |  1400000  |
+-----------+---------+-----------+
```

</details>

### Related projects

You might also be interested in these projects:

- [xlsx](https://www.npmjs.com/package/xlsx): A library to parse and write Excel files. | [homepage](https://github.com/SheetJS/sheetjs "A library to parse and write Excel files.")

### Contributors

| **Commits** | **Contributor**                                 |
| ----------- | ----------------------------------------------- |
| 13          | [jeet-dhandha](https://github.com/jeet-dhandha) |

### Author

**Jeet Dhandha**

- [LinkedIn Profile](https://linkedin.com/in/jeet-dhandha)
- [GitHub Profile](https://github.com/jeet-dhandha)

### License

Released under the [MIT License](LICENSE).
