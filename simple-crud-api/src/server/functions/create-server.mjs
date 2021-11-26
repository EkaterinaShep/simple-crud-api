import http from 'http';
import { respondToRequest } from '../../helpers/req-res/index.mjs';
import { responses } from '../../constants/constants.mjs';

function createServer({ requestListener }) {
  return http.createServer((req, res) =>
    requestListener(req, res).catch(() =>
      respondToRequest(
        res,
        responses['500'],
        `Sorry, an internal error has occurred. Please, connect katshep.pr@gmail.com'`
      )
    )
  );
}

export { createServer };
