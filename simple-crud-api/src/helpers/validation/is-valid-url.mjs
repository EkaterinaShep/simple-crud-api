function isValidUrl(url, api_path) {
  return url.startsWith(api_path) && !url.endsWith('/');
}

export { isValidUrl };
