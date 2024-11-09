const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const json = require("@rollup/plugin-json");

module.exports = {
  input: ["index.js", "src/**/*.js"], // Adjust the entry point as needed
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // so Rollup can find node_modules
    commonjs(), // so Rollup can convert commonjs to ES modules
    json(), // so Rollup can import JSON files
    terser(), // to minify the bundle
  ],
};
