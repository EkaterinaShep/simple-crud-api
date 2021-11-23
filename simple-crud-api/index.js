import {
  createServer,
  getHost,
  getPort,
  listenServer,
} from './src/server/index.js';
import * as requestListener from './src/controllers/requestListener/request-listener.mjs';

const server = createServer(requestListener);
const PORT = getPort();
const HOST = getHost();

listenServer({ server, PORT, HOST });
