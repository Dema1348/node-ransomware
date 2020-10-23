const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');

const EXT = 'd3m4n3t';

const decode = (folder, algorithm, password) => {
  logger.debug(`Folder ${folder}`);
  logger.debug(`Algorithm ${algorithm}`);
  logger.debug(`Password ${password}`);

  const key = crypto.scryptSync(password, 'salt', 24);

  logger.debug(`Key ${key.toString('hex')}`);

  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const { name, dir } = path.parse(folder);
  const input = fs.createReadStream(folder);

  const output = fs.createWriteStream(path.join(dir, name));
  input.pipe(decipher).pipe(output);
  return new Promise((resolve, reject) => {
    input.on('end', () => resolve());
    input.on('error', (error) => reject(error));
  });
};

const encode = (folder, algorithm, password) => {
  logger.debug(`Folder ${folder}`);
  logger.debug(`Algorithm ${algorithm}`);
  logger.debug(`Password ${password}`);

  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0);

  logger.debug(`Key ${key.toString('hex')}`);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const input = fs.createReadStream(folder);
  const output = fs.createWriteStream(`${folder}.${EXT}`);

  input.pipe(cipher).pipe(output);

  return new Promise((resolve, reject) => {
    input.on('end', () => resolve());
    input.on('error', (error) => reject(error));
  });
};

const encodeFolder = async (folder, algorithm, password) => {
  const files = await fs.promises.readdir(folder);

  if (!files.length) return;

  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(folder, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        await encodeFolder(fullPath, algorithm, password);
      } else {
        logger.info(fullPath);
        const { ext } = path.parse(fullPath);

        if (ext !== `.${EXT}`) {
          try {
            await encode(fullPath, algorithm, password);
            logger.info(`Encode file ${fullPath}`);
            await fs.promises.unlink(fullPath);
          } catch (error) {
            logger.error(error);
            logger.info(`Encode fail ${fullPath}`);
          }
        }
      }
    })
  );
};

const decodeFolder = async (folder, algorithm, password) => {
  const files = await fs.promises.readdir(folder);

  if (!files.length) return;

  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(folder, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        await decodeFolder(fullPath, algorithm, password);
      } else {
        logger.info(fullPath);
        const { ext } = path.parse(fullPath);

        if (ext !== `.${EXT}`) {
          try {
            await decode(fullPath, algorithm, password);
            logger.info(`Decode file ${fullPath}`);
            await fs.promises.unlink(fullPath);
          } catch (error) {
            logger.error(error);
            logger.info(`Decode fail ${fullPath}`);
          }
        }
      }
    })
  );
};

module.exports = {
  encodeFolder,
  decodeFolder,
};
