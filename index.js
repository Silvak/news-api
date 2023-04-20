const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
  "/",
  createProxyMiddleware({
    target: "https://cnnespanol.cnn.com/seccion/economia-y-negocios/", // la URL de la página de terceros a la que se quiere acceder
    changeOrigin: true,
    secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
