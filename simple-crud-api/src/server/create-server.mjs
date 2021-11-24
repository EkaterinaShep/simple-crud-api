import http from 'http';

function createServer({ requestListener }) {
  return http.createServer(requestListener);
}

export { createServer };
