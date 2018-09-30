const dotenv = require('dotenv');

const dotenvConfigResult = dotenv.config();

if (dotenvConfigResult.error) {
  throw result.error
}
