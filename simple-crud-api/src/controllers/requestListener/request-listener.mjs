function handleRequests(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ddd');
}

export { handleRequests };
