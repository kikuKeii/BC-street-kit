const express = require("express");
const server = express();
const app = require("./app/Loader");
const setupCors = require("./app/Cors");
const setupLogs = require("./app/Log");
const routes = require("./app/Routes");
const path = require("path");

server.use("/static", express.static("public"));

setupLogs(server);

setupCors(server);

server.set("view engine", "ejs");

server.set("views", path.join(__dirname, "views"));

server.use("/", routes);

server.use((req, res) => {
  return res.status(404).json({
    status: 404,
    method: req.method,
    route: `${req.protocol}://${req.hostname}${req.port != 80 ? `:${app.port}` : ""
      }${req.originalUrl}`,
    message: `Not found`,
  });
});

server.listen(app.port, () => {
  console.log(`Server is running on port ${app.port}`);
});
