function hasId(url, api_path) {
  const apiPathLength = api_path.length;
  const urlLength = url.length;

  return urlLength > apiPathLength;
}

function getId(url) {
  return url.split('/', 3)[2];
}

export { hasId, getId };
