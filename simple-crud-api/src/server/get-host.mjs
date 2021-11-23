import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

function getHost() {
  return process.env.HOST || '127.0.0.1';
}

export { getHost };
