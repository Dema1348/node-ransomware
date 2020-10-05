# MiWOM: Auth

## Setup Environment

```bash
# Install dependencies
yarn install

# Copy and fill with your environment settings
cp .env.example .env
```

## Running

```bash
# Running app
yarn run start

# Load environment vars on .env file if exists and running app
yarn run start:dotenv

# Running app in watch mode
yarn run dev

# Load environment vars on .env file is exists and running app in watch mode
yarn run dev:dotenv
```

## Testing

```bash
# Optional, by default read vars on .env file
cp .env.example .env.test

# Only run test
yarn run test

# Running test and generate coverage report
yarn run test:coverage

# Running test in watch mode
yarn run test:watch
```
