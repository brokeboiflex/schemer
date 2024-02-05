// configReader.js
const fs = require("fs");

function readConfig() {
  const configFile = fs.readFileSync("schemer.json", "utf8");
  return JSON.parse(configFile);
}

module.exports = readConfig;
