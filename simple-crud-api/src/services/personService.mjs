import * as db from '../db/db.mjs';
import { Person } from '../models/personModel.mjs';
import {
  isValidId,
  isValidJson,
  hasRequiredProperties,
  areValidProperties,
} from '../helpers/validation/index.mjs';
import {
  InvalidJSONError,
  MissingPropertyError,
  AbsentIDError,
  InvalidIDError,
  InvalidPropertyError,
} from '../errors/custom-errors.mjs';
import { getRequestBody } from '../helpers/req-res/get-request-body.mjs';
import { getOnlyRequiredProperties } from './helpers/index.mjs';

function getAll() {
  return db.getAll();
}

function findPerson(id) {
  const results = db.findById(id);

  if (!isValidId(id)) {
    throw new InvalidIDError(`The ID '${id}' is not valid`);
  }

  if (results.length === 0) {
    throw new AbsentIDError(`Person with ID '${id}' was not found`);
  }

  return results[0];
}

async function addPerson(req) {
  const reqBody = await getRequestBody(req);

  if (!isValidJson(reqBody)) {
    throw new InvalidJSONError('Invalid JSON string');
  }

  if (!hasRequiredProperties(reqBody, ['name', 'age', 'hobbies'])) {
    throw new MissingPropertyError('The required properties are not defined');
  }

  if (!areValidProperties(reqBody)) {
    throw new InvalidPropertyError('The properties are invalid');
  }

  const person = new Person(JSON.parse(reqBody));

  db.addData(person);

  return person;
}

async function updatePerson(id, req) {
  const person = findPerson(id);

  const reqBody = await getRequestBody(req);

  if (!isValidJson(reqBody)) {
    throw new InvalidJSONError('Invalid JSON string');
  }

  if (!areValidProperties(reqBody)) {
    throw new InvalidPropertyError('The properties are invalid');
  }

  const newProperties = JSON.parse(reqBody);

  const newRequiredProperties = getOnlyRequiredProperties(newProperties);
  
  db.updateData(person, newRequiredProperties);

  return person;
}

function deletePerson(id) {
  const person = findPerson(id);

  db.deleteData(person);
}

export { getAll, findPerson, addPerson, updatePerson, deletePerson };
