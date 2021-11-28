function hasRequiredProperties(reqBody, properties) {
  const parsedBody = JSON.parse(reqBody);

  for (let i = 0; i < properties.length; i++) {
    if (properties[i] in parsedBody) {
      return false;
    }
  }

  return true;
}

export { hasRequiredProperties };
