const fs = require("fs");
const config = require("./Config");

const logger = (type, ...values) => {
  console.log(type, ...values);
  if (
    config.log_write == true ||
    config.log_write == "true" ||
    config.log_write == "1" ||
    config.log_write == 1
  ) {
    const logFileName =
      "./logs/" + new Date().toISOString().split("T")[0] + ".log";
    const logFile = fs.createWriteStream(logFileName, { flags: "a" });
    logFile.write(type + " " + values.join(" ") + "\n");
    logFile.end();
  }
};

/**
 * Setup logs to server
 * @param {Express} server
 */
const setupLogs = (server) => {
  server.use((req, res, next) => {
    logger(
      `${new Date()
        .toISOString()
        .split("T")
        .join(" ")
        .replace(/.\d+Z$/, "")} <<<`,
      ""
    );
    const startTime = Date.now();
    logger("RECV <<<", req.method, req.url, req.hostname);
    logger("HEAD <<<", req.headers);
    // logger("G")
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      logger("SEND >>>", res.statusCode, `Duration: ${duration}ms`);
    });

    next();
  });
};

module.exports = setupLogs;
