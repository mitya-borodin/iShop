const sveltePreprocess = require("svelte-preprocess");
const postcssConfig = require("./postcss.config.js");

const preprocess = sveltePreprocess({
  postcss: {
    plugins: postcssConfig.plugins,
  },
});

module.exports = {
  preprocess,
};
