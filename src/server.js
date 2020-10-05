require('dotenv').config();
const { encode, decode } = require('./app');
const logger = require('./utils/logger');

const FOLDER = 'test.txt';
const ALGORITHM = 'aes-192-cbc';
const PASSWORD = 'qweqwe';

logger.info(
  `Starting in ${process.env.NODE_ENV} mode and logger ${process.env.LOGGER_LEVEL} mode`
);

const init = async () => {
  await encode(FOLDER, ALGORITHM, PASSWORD);
  logger.info(`Encode done `);
  await decode(FOLDER, ALGORITHM, PASSWORD);
  logger.info(`Decode done`);
};

init();
