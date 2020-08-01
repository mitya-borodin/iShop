const sveltePreprocess = require("svelte-preprocess");
const postcssConfig = require("./postcss.config.js");

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      configFilePath: "./postcss.config.js",
    },
  }),
};
