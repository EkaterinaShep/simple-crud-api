import {
  createServer,
  setServerOption,
  listenServer,
} from './src/server/index.js';
import * as requestListener from './src/handlers/request-listener.mjs';

const server = createServer({ requestListener: requestListener.handleRequest });
const PORT = setServerOption({ envVarName: 'PORT', staticValue: 8080 });
const HOST = setServerOption({ envVarName: 'HOST', staticValue: '127.0.0.1' });

listenServer({ server, PORT, HOST });
