const sveltePreprocess = require("svelte-preprocess");
const postcss = require("./postcss.config.js");

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  preprocess: sveltePreprocess({
    defaults: {
      script: "typescript",
    },
    postcss,
  }),
};
