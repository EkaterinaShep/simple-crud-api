import { server } from './src/server/index.mjs';
import { setServerOption, listenServer } from './src/server/helpers/index.js';

const PORT = setServerOption({ envVarName: 'PORT', staticValue: 8080 });
const HOST = setServerOption({ envVarName: 'HOST', staticValue: '127.0.0.1' });

listenServer({ server, PORT, HOST });
