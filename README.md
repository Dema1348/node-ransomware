# Ransomware

## Setup Environment

```bash
# Install dependencies
yarn install

# Copy and fill with your environment settings
cp .env.example .env
```

## Command options

```bash

Usage: --f [folder] --a [algorithm] --p [password] --d (decode) --e (encode)


```

## Example

Example for decode

```bash

yarn run start --f '/Users/edson.perez/Desktop/node-ransomware/toEncode' --a 'aes-192-cbc' --p 'qweqwe' -d

```

Example for encode

```bash

yarn run start --f '/Users/edson.perez/Desktop/node-ransomware/toEncode' --a 'aes-192-cbc' --p 'qweqwe' -e

```

## Running

```bash
# Running app
yarn run start -- --f '/Users/edson.perez/Desktop/node-ransomware/toEncode' --a 'aes-192-cbc' --p 'qweqwe' -d

# Running app in watch mode
yarn run dev

```

## Testing

```bash

# Only run test
yarn run test

# Running test and generate coverage report
yarn run test:coverage

# Running test in watch mode
yarn run test:watch
```
