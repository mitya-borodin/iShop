const httpProxy = require("http-proxy");
const apiProxy = httpProxy.createServer({
  target: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`,
});
const wsProxy = httpProxy.createServer({
  target: `http://${process.env.WS_HOST}:${process.env.WS_PORT}/ws`,
  ws: true,
});

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/_dist_" },
  },
  routes: [
    {
      src: "/api",
      dest: (req, res) => apiProxy.web(req, res),
    },
    {
      src: "/ws",
      dest: (req, res) => wsProxy.ws(req, res),
    },
  ],
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-webpack",
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eslint src --ext .js,jsx,.ts,.tsx",
        // Optional: Use npm package "eslint-watch" to run on every file change
        watch: "esw -w --clear src --ext .js,jsx,.ts,.tsx",
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    sourcemap: true,
  },
};
