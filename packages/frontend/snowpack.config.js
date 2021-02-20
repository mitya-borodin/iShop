const httpProxy = require("http-proxy");
require("dotenv").config();

let apiProxy;
let wsProxy;

console.log(!process.env.DOCKER);
console.log({
  target: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
});
console.log({
  target: `ws://${process.env.WS_HOST}:${process.env.WS_PORT}`,
  ws: true,
});

if (!process.env.DOCKER) {
  apiProxy = httpProxy.createServer({
    target: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  });
  wsProxy = httpProxy.createServer({
    target: `ws://${process.env.WS_HOST}:${process.env.WS_PORT}`,
    ws: true,
  });
}

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/_dist_" },
  },
  routes: [
    ...(!process.env.DOCKER
      ? [
          {
            src: "/api/.*",
            dest: (req, res) => {
              console.log("HTTP_REQUEST");

              apiProxy.web(req, res);
            },
          },
          {
            match: "all",
            src: "/ws",
            dest: (req, res) => {
              console.log("WS_REQUEST");

              wsProxy.ws(req, res.socket);
            },
          },
        ]
      : []),
    { match: "routes", src: ".*", dest: "/index.html" },
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
