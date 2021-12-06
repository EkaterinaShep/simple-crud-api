import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

function setServerOption({ envVarName, staticValue }) {
  return process.env[envVarName] || staticValue;
}

export { setServerOption };
