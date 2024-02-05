# jsontsschemer

`jsontsschemer` is a utility package for automatic type generation from `.json` files

# Instalation

`npm i jsontsschemer`

# Config

Create a `schemer.json` file in your project's root directory

<!-- prettier-ignore-start -->
```json
{
  "jsonFiles": [
    "path/to/inputFile1.json", 
    "path/to/inputFile2.json",
    ...
    ],
  "outputFiles": [
    "path/to/outputFile1.ts", 
    "path/to/outputFile2.ts",
    ...
    ]
}
```
<!-- prettier-ignore-end -->

# Usage

Add those two scripts to your `package.json`

<!-- prettier-ignore-start -->
```json
scripts: {
  "generate-types": "jsontsschemeer gen",
  "watch-json": "jsontsschemer watch"
}
```
<!-- prettier-ignore-end -->

And use as needed
