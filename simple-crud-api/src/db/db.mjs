import { Person } from '../models/personModel.mjs';

const db = [
  new Person({
    id: 'f8f482e5-ebb3-4682-9f6a-d3288ae19362',
    name: 'Vasya',
    age: 22,
    hobbies: ['parkour', 'bicycling'],
  }),
];

function getAll() {
  return db;
}

function findById(id) {
  return db.filter((object) => object.id === id);
}

function addData(data) {
  db.push(data);
}

function updateData(id, newProperties) {
  const data = findById(id)[0];

  Object.entries(newProperties).forEach((property) => {
    const key = property[0];
    const value = property[1];

    data[key] = value;
  });
}

function deleteData(data) {
  const index = db.findIndex((item) => item.id === data.id);

  db.splice(index, 1);
}

export { getAll, findById, addData, updateData, deleteData };
