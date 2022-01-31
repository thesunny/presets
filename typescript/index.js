// Mrm module to work with new line separated text files
const mrm = require("mrm-core");
const utils = require("@thesunny/script-utils");
const path = require("path");

module.exports = function task() {
  utils.copyFile(
    path.join(__dirname, "..", "tsconfig.base.json"),
    "tsconfig.base.json"
  );
};

module.exports.description = "Add TypeScript";
