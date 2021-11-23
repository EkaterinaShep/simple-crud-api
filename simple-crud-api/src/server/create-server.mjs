import http from 'http';

function createServer(requestsListener) {
  return http.createServer(requestsListener.handleRequests);
}

export { createServer };
