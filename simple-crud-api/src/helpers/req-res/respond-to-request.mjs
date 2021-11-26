function respondToRequest(
  res,
  { statusCode, statusMessage, headers },
  endMessage
) {
  res.writeHead(statusCode, statusMessage, headers);

  const message =
    String(statusCode)[0] === '4' || String(statusCode)[0] === '5'
      ? { message: endMessage }
      : endMessage;

  res.end(JSON.stringify(message));
}

export { respondToRequest };
