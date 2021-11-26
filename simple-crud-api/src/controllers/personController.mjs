import { responses } from '../constants/constants.mjs';
import { getRequestBody, respondToRequest } from '../helpers/req-res/index.mjs';
import { isValidId } from '../helpers/validation/is-valid-id.mjs';
import { isValidJson } from '../helpers/validation/is-valid-json.mjs';
import * as personService from '../services/personService.mjs';

function handleRequest(req, res, { API_PATH, method, url }) {
  if (hasId(url, API_PATH)) {
    handleRequestWithId(req, res, method, url);
    return;
  }

  handleRequestWithoutId(req, res, method).catch((err) => {
    console.log(44444);
  });
}

async function handleRequestWithId(req, res, method, url) {
  const id = getId(url);
  let person;

  switch (method) {
    case 'GET':
      if (!isValidId(id)) {
        respondToRequest(res, responses['400'], `The ID '${id}' is not valid`);
        return;
      }

      person = personService.findPerson(id);

      if (person.length === 0) {
        respondToRequest(
          res,
          responses['404'],
          `Person with ID '${id}' was not found`
        );
        return;
      }

      respondToRequest(res, responses['200'], person);
      break;

    case 'PUT':
      if (!isValidId(id)) {
        respondToRequest(res, responses['400'], `The ID '${id}' is not valid`);
        return;
      }

      person = personService.findPerson(id);

      if (person.length === 0) {
        respondToRequest(
          res,
          responses['404'],
          `Person with ID '${id}' was not found`
        );
        return;
      }

      const reqBody = await getRequestBody(req);

      if (!isValidJson(reqBody)) {
        respondToRequest(res, responses['400'], `Invalid JSON string`);
        return;
      }

      person = personService.updatePerson(id, reqBody);

      respondToRequest(res, responses['200'], person);

      break;
    case 'DELETE':
      if (!isValidId(id)) {
        respondToRequest(res, responses['400'], `The ID '${id}' is not valid`);
        return;
      }

      person = personService.findPerson(id);

      if (person.length === 0) {
        respondToRequest(
          res,
          responses['404'],
          `Person with ID '${id}' was not found`
        );
        return;
      }

      person = personService.deletePerson(person[0]);

      respondToRequest(res, responses['204']);

      break;
  }
}
async function handleRequestWithoutId(req, res, method) {
  let persons;

  switch (method) {
    case 'GET':
      persons = personService.getAll();

      respondToRequest(res, responses['200'], persons);

      break;

    case 'POST':
      const reqBody = await getRequestBody(req);

      if (!isValidJson(reqBody)) {
        respondToRequest(res, responses['400'], `Invalid JSON string`);
        return;
      }

      if (personService.isValidPerson(reqBody)) {
        const person = personService.addPerson(reqBody);
        respondToRequest(res, responses['200'], person);
        return;
      }

      respondToRequest(
        res,
        responses['400'],
        `The required properties are not defined`
      );

      break;
  }
}

function hasId(url, api_path) {
  const apiPathLength = api_path.length;
  const urlLength = url.length;

  return urlLength > apiPathLength;
}

function getId(url) {
  return url.split('/', 3)[2];
}

export { handleRequest, hasId };
