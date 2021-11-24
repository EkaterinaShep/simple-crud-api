function respondToRequest(
  res,
  { statusCode, statusMessage, headers, endMessage }
) {
  res.writeHead(statusCode, statusMessage, headers);
  res.end(JSON.stringify({ message: endMessage }));
}

export { respondToRequest };
