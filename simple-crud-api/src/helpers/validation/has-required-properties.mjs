function hasRequiredProperties(reqBody, properties) {
  const parsedBody = JSON.parse(reqBody);

  properties.forEach((property) => {
    if (!(property in parsedBody)) {
      return false;
    }
  });

  return true;
}

export { hasRequiredProperties };
