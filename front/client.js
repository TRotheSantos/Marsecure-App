const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const apiProxy = createProxyMiddleware("/api", {
    target: "http://localhost:4000/",
});

app.use(express.static("public"));
app.use(apiProxy);

app.listen(3000, function () {
    console.log("Client listening on port 3000");
});
