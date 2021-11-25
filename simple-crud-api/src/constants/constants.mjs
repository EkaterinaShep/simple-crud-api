const API_PATH = '/person';

const responses = {
  200: {
    statusCode: 200,
    statusMessage: 'OK',
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
};

export { responses, API_PATH };
