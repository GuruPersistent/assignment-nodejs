const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/callback", { target: "http://localhost:4000/callback" }),
    createProxyMiddleware("/api/*", { target: "http://localhost:4000/" })
  );
};
