const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://uncrapi.link", // 실제 API의 주소
      changeOrigin: true,
    })
  );
};
