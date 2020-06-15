module.exports = {
  plugins: [
    // require("tailwindcss"),

    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require("postcss-import")({ path: "resources/css" }),

    // https://github.com/MadLittleMods/postcss-css-variables
    require("postcss-css-variables")(),

    // Postcss flexbox bug fixer
    // https://github.com/luisrudge/postcss-flexbugs-fixes
    require("postcss-flexbugs-fixes")(),

    // https://github.com/csstools/postcss-preset-env
    require("postcss-preset-env")({
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
      },
      stage: 3,
    }),

    // https://github.com/csstools/postcss-normalize
    require("postcss-normalize")(),

    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
