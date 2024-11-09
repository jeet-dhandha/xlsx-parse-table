const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");
const babel = require("rollup-plugin-babel");

module.exports = {
  input: "src/index.js", // Adjust the entry point as needed
  output: [
    {
      file: "dist/index.js",
      format: "iife",
      name: "xlsxTableParser",
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(), // so Rollup can find node_modules
    commonjs(), // so Rollup can convert commonjs to ES modules
    json(), // so Rollup can import JSON files
    terser(), // to minify the bundle
  ],
};
