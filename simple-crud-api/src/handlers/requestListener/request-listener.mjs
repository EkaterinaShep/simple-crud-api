import { respondToRequest } from '../../helpers/req-res/respond-to-request.mjs';
import * as PersonController from '../../controllers/personController.mjs';

const API_PATH = '/person';
const responses = {
  404: {
    statusCode: 404,
    statusMessage: 'Not Found',
    headers: { 'Content-Type': 'application/json' },
  },
};

function handleRequest(req, res) {
  const { headers, method, url } = req;

  if (url === API_PATH || url.startsWith(`${API_PATH}/`)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ccc');
    return;
  }

  responses['404']['endMessage'] = `The requested URL ${url} was not found`;
  respondToRequest(res, responses['404']);
}

export { handleRequest };
