#!/usr/bin/env node
const { watchJSONAndGenerateTypes, generateTypes } = require("./generator");

const mode = process.argv[2]; // Get the mode argument passed from the command line

switch (mode) {
  case "watch":
    watchJSONAndGenerateTypes();
    break;
  case "gen":
    generateTypes();
    break;
  default:
    console.error('Invalid mode. Use "watch" or "gen".');
    process.exit(1);
}
