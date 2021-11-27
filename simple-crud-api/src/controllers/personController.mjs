import { responses } from '../constants/constants.mjs';
import { respondToRequest } from '../helpers/req-res/index.mjs';
import * as PersonService from '../services/personService.mjs';
import { getId, hasId } from './helpers/index.mjs';

/* ------------------------------ Main function ----------------------------- */
async function handleRequest({ req, res, API_PATH }) {
  const { url } = req;

  if (hasId(url, API_PATH)) {
    await handleRequestWithId(req, res);
    return;
  }

  await handleRequestWithoutId(req, res);
}

/* ------------------------------ Subfunctions ------------------------------ */
async function handleRequestWithId(req, res) {
  const { url, method } = req;
  const id = getId(url);
  let person;

  switch (method) {
    case 'GET':
      person = PersonService.findPerson(id);

      respondToRequest(res, responses['200'], person);

      break;

    case 'PUT':
      person = await PersonService.updatePerson(id, req);

      respondToRequest(res, responses['200'], person);

      break;

    case 'DELETE':
      PersonService.deletePerson(id);

      respondToRequest(res, responses['204']);

      break;

    default:
      respondToRequest(
        res,
        responses['405'],
        `The '${method}' method is not supported`
      );

      return;
  }
}

async function handleRequestWithoutId(req, res) {
  const { method } = req;
  let persons;

  switch (method) {
    case 'GET':
      persons = PersonService.getAll();

      respondToRequest(res, responses['200'], persons);

      break;

    case 'POST':
      const person = await PersonService.addPerson(req);

      respondToRequest(res, responses['201'], person);

      break;

    default:
      respondToRequest(
        res,
        responses['405'],
        `The '${method}' method is not supported`
      );

      return;
  }
}

export { handleRequest };
