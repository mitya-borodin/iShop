/* const path = require("path");
const fs = require("fs");

const tempBuildManifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), {
    encoding: "utf-8",
  }),
);
const browsersList =
  tempBuildManifest.browsersList || ">0.75%, not ie 11, not UCAndroid >0, not OperaMini all";
 */
module.exports = {
  plugins: [
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    // require("postcss-import")({ path: "resources/css" }),

    // https://tailwindcss.com/docs/using-with-preprocessors
    require("tailwindcss"),

    // https://github.com/MadLittleMods/postcss-css-variables
    // require("postcss-css-variables")(),

    // Postcss flexbox bug fixer
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    // require("postcss-flexbugs-fixes")(),

    // https://github.com/csstools/postcss-preset-env
    /* require("postcss-preset-env")({
      features: {
        ["case-insensitive-attributes"]: true,
        ["all-property"]: {
          reset: "inherited",
        },
        ["color-functional-notation"]: true,
        ["custom-media-queries"]: true,
        ["media-query-ranges"]: true,
        ["nesting-rules"]: true,
        ["custom-properties"]: true,
      },
      autoprefixer: {
        flexbox: "no-2009",
        overridebrowsersList: browsersList,
      },
      stage: 3,
      browsers: browsersList,
    }), */

    // ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
