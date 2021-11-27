const db = [];

function getAll() {
  return db;
}

function findById(id) {
  return db.filter((object) => object.id === id);
}

function addData(data) {
  db.push(data);
}

function updateData(data, newProperties) {
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
