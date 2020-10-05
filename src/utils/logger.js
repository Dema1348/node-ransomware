const logger = require('simple-node-logger').createSimpleLogger();

logger.setLevel(process.env.LOGGER_LEVEL);

module.exports = logger;
