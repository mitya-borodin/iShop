const path = require("path");
const fs = require("fs");

const pathToJson = path.resolve(__dirname, process.argv[2]);
const pathToEnv = path.resolve(__dirname, "secret.env");

const json = require(pathToJson);

const content = [];

for (const key in json) {
  content.push(`${key}="${json[key]}"`);
}

fs.unlinkSync(pathToJson);
fs.writeFileSync(pathToEnv, content.join("\n"));
