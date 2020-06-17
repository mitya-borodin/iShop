module.exports = {
  preset: "ts-jest",
  ...require("@snowpack/app-scripts-svelte/jest.config.js")(),
  moduleFileExtensions: ["ts", "js", "json", "svelte"],
};
