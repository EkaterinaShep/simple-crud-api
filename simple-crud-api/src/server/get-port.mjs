import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

function getPort() {
  return process.env.PORT || 8080;
}

export { getPort };
