const sveltePreprocess = require("svelte-preprocess");
const postCSSConfig = require("./postcss.config.js");

const preprocess = sveltePreprocess({
  postcss: {
    // Проверить работают или нет эти плагины, можно при помощи
    // отключения tailwindcss сразу пропадут CSS свойства.
    plugins: [require("tailwindcss"), ...postCSSConfig.plugins],
  },
});

module.exports = {
  preprocess,
};
