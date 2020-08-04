const getSvelteJestConfig = require("@snowpack/app-scripts-svelte/jest.config.js");

const configuration = getSvelteJestConfig();

module.exports = {
  // Тесты не запускаются потому что в svelte.config.js имеется sveltePreprocess с настройками.
  ...configuration,
  transform: {
    ...configuration.transform,
    "^.+\\.svelte$": ["jest-transform-svelte", { preprocess: undefined }],
  },
  collectCoverage: true,
};
