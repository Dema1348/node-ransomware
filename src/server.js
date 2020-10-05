const { encode, decode } = require('./app');
const logger = require('./utils/logger');

logger.info(
  `Starting in ${process.env.NODE_ENV} mode and logger ${process.env.LOGGER_LEVEL} mode`
);
