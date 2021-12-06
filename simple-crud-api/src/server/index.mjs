import { createServer } from './helpers/index.js';
import * as requestListener from '../handlers/request-listener.mjs';

const server = createServer({ requestListener: requestListener.handleRequest });

export { server };
