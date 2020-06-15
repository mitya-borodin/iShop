module.exports = {
  ...require("@snowpack/app-scripts-svelte/jest.config.js")(),
  preset: "ts-jest",
  testEnvironment: "node",
};
