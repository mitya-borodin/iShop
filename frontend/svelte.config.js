const sveltePreprocess = require("svelte-preprocess");
const postcss = require("./postcss.config.js");

module.exports = {
  preprocess: sveltePreprocess({ postcss }),
};
