const API_PATH = '/person';

const responses = {
  200: {
    statusCode: 200,
    statusMessage: 'OK',
    headers: { 'Content-Type': 'application/json' },
  },
  201: {
    statusCode: 201,
    statusMessage: 'Created',
    headers: { 'Content-Type': 'application/json' },
  },
  204: {
    statusCode: 204,
    statusMessage: 'No Content',
    headers: { 'Content-Type': 'application/json' },
  },
  400: {
    statusCode: 400,
    statusMessage: 'Bad Request',
    headers: { 'Content-Type': 'application/json' },
  },
  404: {
    statusCode: 404,
    statusMessage: 'Not Found',
    headers: { 'Content-Type': 'application/json' },
  },
  405: {
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
    headers: { 'Content-Type': 'application/json' },
  },
  500: {
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    headers: { 'Content-Type': 'application/json' },
  },
};

export { responses, API_PATH };
