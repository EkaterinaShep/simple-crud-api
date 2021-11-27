function listenServer({ server, PORT, HOST }) {
  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}

export { listenServer };
