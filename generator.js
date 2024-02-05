// generator.js
const fs = require("fs");
const chokidar = require("chokidar");
const jsonSchemaToTS = require("json-schema-to-typescript");

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
        console.log(tsContent.lines.join("\n"));
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

  chokidar.watch(config.jsonFiles).on("change", (path) => {
    const inputFile = path;
    const outputFile = config.outputFiles[config.jsonFiles.indexOf(path)];

    jsonSchemaToTS
      .compileFromFile(inputFile, { ignoreMinAndMaxItems: true })
      .then((tsContent) => {
        fs.writeFileSync(outputFile, tsContent);
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
