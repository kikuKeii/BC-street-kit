const { HOST, PORT, LOG_WRITE } = process.env;

module.exports = {
  host: HOST || "localhost",
  port: Number(PORT) || 3000,
  log_write: LOG_WRITE || true,
};
