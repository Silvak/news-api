const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// url webs directions
const URLS = {
  ELPAIS: "http://elpais.com/america-colombia/?ed=col",
  REUTERS: "http://www.reuters.com/business/",
  CNN: "http://cnnespanol.cnn.com/seccion/economia-y-negocios/",
};

// proxys
const corsProxyPais = createProxyMiddleware({
  target: URLS.ELPAIS,
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["access-control-allow-origin"] = "*";
    proxyRes.headers["access-control-allow-credentials"] = "true";
  },
});

const corsProxyReuters = createProxyMiddleware({
  target: URLS.REUTERS,
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["access-control-allow-origin"] = "*";
    proxyRes.headers["access-control-allow-credentials"] = "true";
  },
});

const corsProxyCnn = createProxyMiddleware({
  target: URLS.CNN,
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers["access-control-allow-origin"] = "*";
    proxyRes.headers["access-control-allow-credentials"] = "true";
  },
});

//app
app.use("/api/elpais", corsProxyPais);
app.use("/api/reuters", corsProxyReuters);
app.use("/api/cnn", corsProxyCnn);

app.listen(3000, () => {
  console.log("Server start on port 3000");
});
