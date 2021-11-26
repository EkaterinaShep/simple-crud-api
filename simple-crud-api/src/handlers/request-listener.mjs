import { responses, API_PATH } from '../constants/constants.mjs';
import * as Controller from '../controllers/personController.mjs';
import { respondToRequest } from '../helpers/req-res/respond-to-request.mjs';
import { isValidUrl } from '../helpers/validation/is-valid-url.mjs';
import { CustomError } from '../errors/custom-errors.mjs';

async function handleRequest(req, res) {
  const { url } = req;

  if (isValidUrl(url, API_PATH)) {
    await Controller.handleRequest({ req, res, API_PATH }).catch((err) => {
      if (err instanceof CustomError) {
        respondToRequest(res, responses[`${err.statusCode}`], err.message);
        return;
      }

      throw err;
    });
    return;
  }

  respondToRequest(
    res,
    responses['404'],
    `The requested URL '${url}' was not found on this server`
  );
}

export { handleRequest };
