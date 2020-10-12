// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  extends: "@snowpack/app-scripts-svelte",
  install: ["tslib"],
  installOptions: {
    sourceMap: true,
    treeshake: true,
  },
  devOptions: {
    open: "none",
  },
  buildOptions: {
    clean: true,
  },
  plugins: [
    ["@snowpack/plugin-dotenv"],
    [
      "@snowpack/plugin-webpack",
      {
        extendConfig: (config) => {
          // config.plugins.push(new BundleAnalyzerPlugin());

          return config;
        },
      },
    ],
    ["@snowpack/plugin-run-script", { cmd: "tsc --noEmit", watch: "$1 --watch" }],
    [
      "@snowpack/plugin-run-script",
      { cmd: "eslint 'src/**/*.{js,jsx,ts,tsx}'", watch: 'watch "$1" src' },
    ],
  ],
  proxy: {
    "/api": `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`,
    "/ws": {
      target: `http://${process.env.WS_HOST}:${process.env.WS_PORT}/ws`,
      ws: true,
    },
  },
};
