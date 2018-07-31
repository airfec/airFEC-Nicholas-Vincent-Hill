const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");

// Load the SDK
const AWS = require("aws-sdk");

const app = express();

app.get("/", function(req, res) {
  res.redirect("/rooms/1");
});

app.use(express.static("public"));

app.get("/rooms/:id", function(req, res) {
  const reactPath = path.join(__dirname, "../public/index.html");
  res.sendFile(reactPath);
});

// booking component
app.use(
  "/api/rooms/:id/bookings",
  proxy({
    target: "http://127.0.0.1:3001"
    // changeOrigin: true
  })
);

// photo component
app.use(
  "/api/rooms/:id/photos",
  proxy({
    target: "http://127.0.0.1:3004",
    changeOrigin: true
  })
);

// review component
app.use(
  "/api/rooms/:id/reviews",
  proxy({
    target: "http://127.0.0.1:3002"
    // changeOrigin: true
  })
);

// info component
app.use(
  "/api/rooms/:id",
  proxy({
    target: "http://127.0.0.1:3003"
    // changeOrigin: true
  })
);

app.listen(3000, () => console.log("Proxy listening on port 3000!"));
