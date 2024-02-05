// generator.js
const fs = require("fs");
const fspath = require("path");
const chokidar = require("chokidar");

const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  TypeScriptTargetLanguage,
} = require("quicktype-core");

const readConfig = require("./configReader");

async function generateTypes() {
  const config = await readConfig();
  await config.jsonFiles.forEach(async (inputFile, index) => {
    const outputFile = config.outputFiles[index];
    const file = fs.readFileSync(inputFile, "utf8");

    const jsonInput = jsonInputForTargetLanguage("typescript");

    await jsonInput.addSource({
      name: "file",
      samples: [file],
    });
    const inputData = new InputData();
    inputData.addInput(jsonInput);

    await quicktype({
      inputData,
      lang: new TypeScriptTargetLanguage(),
      alphabetizeProperties: true,

      rendererOptions: {
        "just-types": "true",
      },
    })
      .then((tsContent) => {
        fs.writeFileSync(outputFile, tsContent.lines.join("\n"));
        console.log(
          `TypeScript types generated for ${inputFile} and written to ${outputFile}`
        );
      })
      .catch((error) => {
        console.error(
          `Error generating TypeScript types for ${inputFile}:`,
          error
        );
      });
  });
}

function watchJSONAndGenerateTypes() {
  const config = readConfig();

  chokidar.watch(config.jsonFiles).on("change", async (path) => {
    console.log("file: " + path + " changed");
    const inputFile = path;

    const outputFile = await config.outputFiles[config.jsonFiles.indexOf(path)];

    const file = fs.readFileSync(inputFile, "utf8");

    const jsonInput = jsonInputForTargetLanguage("typescript");

    await jsonInput.addSource({
      name: "file",
      samples: [file],
    });
    const inputData = new InputData();
    inputData.addInput(jsonInput);

    await quicktype({
      inputData,
      lang: new TypeScriptTargetLanguage(),
      alphabetizeProperties: true,

      rendererOptions: {
        "just-types": "true",
      },
    })
      .then((tsContent) => {
        fs.writeFileSync(outputFile, tsContent.lines.join("\n"));
        console.log(
          `TypeScript types generated for ${inputFile} and written to ${outputFile}`
        );
      })
      .catch((error) => {
        console.error(
          `Error generating TypeScript types for ${inputFile}:`,
          error
        );
      });
  });
}

module.exports = {
  generateTypes,
  watchJSONAndGenerateTypes,
};
