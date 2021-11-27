import 'regenerator-runtime/runtime';
import supertest from 'supertest';
import { randomUUID } from 'crypto';
import { server } from '../src/server/index.mjs';

const request = supertest(server);
const correctDatumJSON = '{"name": "Vasya", "age": 22, "hobbies": ["parkour"]}';
const correctDatumParsed = JSON.parse(correctDatumJSON);
const correctDatumWithId = Object.assign({}, correctDatumParsed, {
  id: '',
});
const incorrectDatumJSON = '{"name": "Vasya", "age": 22}';
const invalidId = 'abcde';
const randomId = randomUUID();
let id = '';

describe('GET /person', () => {
  test('should return empty array', async () => {
    const response = await request.get('/person');

    expect(response.body).toEqual([]);
  });

  test('should respond with a 200 status code', async () => {
    const response = await request.get('/person');

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /person', () => {
  test('should respond with a 201 status code and return created Datum', async () => {
    const response = await request.post('/person').send(correctDatumJSON);
    id = response.body.id;
    correctDatumWithId['id'] = id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request.post('/person').send(incorrectDatumJSON);

    expect(response.statusCode).toBe(400);
  });
});

describe('GET /person/{personId}', () => {
  test('should respond with a 200 status code and return Datum', async () => {
    const response = await request.get(`/person/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request.get(`/person/${invalidId}`);

    expect(response.statusCode).toBe(400);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request.get(`/person/${randomId}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('PUT /person/{personId}', () => {
  test('should respond with a 200 status code and return updated Datum', async () => {
    correctDatumParsed['age'] = correctDatumParsed['age'] + 1;
    correctDatumWithId['age'] = correctDatumWithId['age'] + 1;

    const response = await request
      .put(`/person/${id}`)
      .send(JSON.stringify(correctDatumParsed));

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request
      .put(`/person/${invalidId}`)
      .send(JSON.stringify(correctDatumParsed));

    expect(response.statusCode).toBe(400);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request
      .put(`/person/${randomId}`)
      .send(JSON.stringify(correctDatumParsed));

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /person/{personId}', () => {
  test('should respond with a 204 status code', async () => {
    const response = await request.delete(`/person/${id}`);

    expect(response.statusCode).toBe(204);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request.delete(`/person/${invalidId}`);

    expect(response.statusCode).toBe(400);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request.delete(`/person/${randomId}`);

    expect(response.statusCode).toBe(404);
  });
});
