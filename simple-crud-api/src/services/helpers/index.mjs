function getOnlyRequiredProperties(properties) {
  const requiredProperties = ['name', 'age', 'hobbies'];
  const result = {};

  Object.entries(properties).forEach((property) => {
    const key = property[0];
    const value = property[1];

    if (requiredProperties.includes(key)) {
      result[key] = value;
    }
  });

  return result;
}

export { getOnlyRequiredProperties };
