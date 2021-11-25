import { respondToRequest } from '../../helpers/req-res/respond-to-request.mjs';
import * as PersonController from '../../controllers/personController.mjs';
import { responses, API_PATH } from '../../constants/constants.mjs';

function handleRequest(req, res) {
  const { method, url } = req;

  if (url === API_PATH || PersonController.hasId(url, API_PATH)) {
    PersonController.handleRequest(req, res, {
      API_PATH,
      method,
      url,
    });
    return;
  }

  respondToRequest(
    res,
    responses['404'],
    `The requested URL '${url}' was not found`
  );
}

export { handleRequest };
