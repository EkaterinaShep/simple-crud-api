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

export { isValidPerson };
