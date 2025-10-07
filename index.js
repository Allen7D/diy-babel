const { transformFileSync } = require("@babel/core");
const path = require("path");
const insertConsolePlugin = require("./plugin/insert-console-plugin");

const { code } = transformFileSync(path.join(__dirname, "./src/source.js"), {
  plugins: [insertConsolePlugin],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});

console.log("Output: \n\n", code);
