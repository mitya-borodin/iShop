module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  preset: "ts-jest",

  ...require("@snowpack/app-scripts-svelte/jest.config.js")(),
  moduleFileExtensions: ["ts", "js", "json", "svelte"],
};
