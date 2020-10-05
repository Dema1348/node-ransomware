const crypto = require('crypto');
const fs = require('fs');
const logger = require('./utils/logger');

const decode = (folder, algorithm, password) => {
  logger.debug(`Folder ${folder}`);
  logger.debug(`Algorithm ${algorithm}`);
  logger.debug(`Password ${password}`);

  const key = crypto.scryptSync(password, 'salt', 24);

  logger.debug(`Key ${key.toString('hex')}`);

  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const input = fs.createReadStream(`${folder}.enc`);
  const output = fs.createWriteStream(`${folder}.dec.txt`, 'utf8');
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
  const output = fs.createWriteStream(`${folder}.enc`);

  input.pipe(cipher).pipe(output);

  return new Promise((resolve, reject) => {
    input.on('end', () => resolve());
    input.on('error', (error) => reject(error));
  });
};

module.exports = {
  decode,
  encode,
};
