import * as db from '../db/db.mjs';
import { Person } from '../models/personModel.mjs';

function getAll() {
  return db.getAll();
}

function findPerson(id) {
  return db.findById(id);
}

function addPerson(reqBody) {
  const person = new Person(JSON.parse(reqBody));

  db.addData(person);

  return person;
}

function isValidPerson(reqBody) {
  const parsedBody = JSON.parse(reqBody);

  const { name, age, hobbies } = parsedBody;

  return (
    !!name && !!age && !!hobbies
    // &&
    // typeof name === 'string' &&
    // name.length > 0 &&
    // typeof age === 'number' &&
    // Array.isArray(hobbies) &&
    // hobbies.length > 0 &&
    // hobbies.filter((hobby) => typeof hobby !== 'string' || hobby.length === 0)
  );
}

export { getAll, findPerson, addPerson, isValidPerson };
