const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
var compression = require("compression");

const app = express();
app.use(compression());

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
    target: "http://ec2-54-215-167-214.us-west-1.compute.amazonaws.com"
    // changeOrigin: true
  })
);

// photo component
app.use(
  "/api/rooms/:id/photos",
  proxy({
    target: "http://ec2-13-57-204-61.us-west-1.compute.amazonaws.com",
    changeOrigin: true
  })
);

// review component
app.use(
  "/api/rooms/:id/reviews",
  proxy({
    target: "http://ec2-54-183-152-199.us-west-1.compute.amazonaws.com"
    // changeOrigin: true
  })
);

// info component
app.use(
  "/api/rooms/:id",
  proxy({
    target: "http://ec2-18-220-233-85.us-east-2.compute.amazonaws.com"
    // changeOrigin: true
  })
);

app.listen(3000, () => console.log("Proxy listening on port 3000!"));
