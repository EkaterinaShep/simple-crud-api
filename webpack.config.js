import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webpackConfig = {
  mode: 'production',
  entry: './simple-crud-api',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    module: true,
  },
  target: 'node16.13',
  experiments: {
    outputModule: true,
  },
};

export default webpackConfig;
