// configReader.js
const fs = require("fs");
const path = require("path");

function readConfig() {
  const configFile = fs.readFileSync("schemer.json", "utf8");
  const config = JSON.parse(configFile);
  if (
    config &&
    config.jsonFiles?.length > 0 &&
    config.outputFiles?.length > 0
  ) {
    const { jsonFiles, outputFiles } = config;

    jsonFiles.forEach((file, index) => {
      config.jsonFiles[index] = path.join(file);
    });
    outputFiles.forEach((file, index) => {
      config.outputFiles[index] = path.join(file);
    });

    return config;
  } else {
    console.error(`Error generating TypeScript types for ${inputFile}:`, error);
  }
}

module.exports = readConfig;
