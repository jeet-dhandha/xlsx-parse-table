const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "src/index.js", // Adjust the entry point as needed
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    resolve(), // so Rollup can find node_modules
    commonjs(), // so Rollup can convert commonjs to ES modules
    terser(), // to minify the bundle
  ],
};
