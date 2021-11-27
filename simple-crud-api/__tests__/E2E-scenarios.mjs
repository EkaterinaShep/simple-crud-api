import 'regenerator-runtime/runtime';
import supertest from 'supertest';
import { randomUUID } from 'crypto';
import { server } from '../src/server/index.mjs';
import * as db from '../src/db/db.mjs';

const request = supertest(server);

describe('First scenario (attentive person): get all data, add one new datum, check that the datum was created, update the datum, delete the datum, check that the datum was deleted', () => {
  const correctDatumJSON =
    '{"name": "Vasya", "age": 22, "hobbies": ["parkour"]}';
  const correctDatumParsed = JSON.parse(correctDatumJSON);
  const correctDatumWithId = Object.assign({}, correctDatumParsed, {
    id: '',
  });
  let id = '';

  test('should respond with a 200 status code and return empty array', async () => {
    const response = await request.get('/person');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should respond with a 201 status code and return created data', async () => {
    const response = await request.post('/person').send(correctDatumJSON);
    id = response.body.id;
    correctDatumWithId['id'] = id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 200 status code and return data', async () => {
    const response = await request.get(`/person/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 200 status code and return updated data', async () => {
    correctDatumParsed['age'] = correctDatumParsed['age'] + 1;
    correctDatumWithId['age'] = correctDatumParsed['age'];

    const response = await request
      .put(`/person/${id}`)
      .send(JSON.stringify(correctDatumParsed));

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(correctDatumWithId);
  });

  test('should respond with a 204 status code', async () => {
    const response = await request.delete(`/person/${id}`);

    expect(response.statusCode).toBe(204);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request.get(`/person/${id}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('Second scenario (inattentive person): find a nonexistent datum, try to add a new datum passing incorrect JSON, try to add a datum without required property, add a datum, try to update a nonexistent datum, try to delete a nonexistent datum', () => {
  const correctDataJSON =
    '{"name": "Vasya", "age": 22, "hobbies": ["parkour"]}';
  const correctDataParsed = JSON.parse(correctDataJSON);
  const correctDataWithId = Object.assign({}, correctDataParsed, {
    id: '',
  });
  const dataWithIncorrectJSON = '{"name": "Vasya", "age": 22';
  const dataWithoutRequiredProperty = '{"name": "Vasya", "age": 22}';
  const randomId = randomUUID();
  let id = '';

  test('should respond with a 404 status code', async () => {
    const response = await request.get(`/person/${randomId}`);

    expect(response.statusCode).toBe(404);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request.post('/person').send(dataWithIncorrectJSON);

    expect(response.statusCode).toBe(400);
  });

  test('should respond with a 400 status code', async () => {
    const response = await request
      .post('/person')
      .send(dataWithoutRequiredProperty);

    expect(response.statusCode).toBe(400);
  });

  test('should respond with a 201 status code and return created data', async () => {
    const response = await request.post('/person').send(correctDataJSON);
    id = response.body.id;
    correctDataWithId['id'] = id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(correctDataWithId);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request
      .put(`/person/${randomId}`)
      .send(JSON.stringify(correctDataParsed));

    expect(response.statusCode).toBe(404);
  });

  test('should respond with a 404 status code', async () => {
    const response = await request.delete(`/person/${randomId}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('Third scenario (unlucky person): try to get all data from non-existing endpoint, try to get all data and receive Internal Server Error', () => {
  test('should respond with a 404 status code', async () => {
    const response = await request.get('/people');

    expect(response.statusCode).toBe(404);
  });

  test('should respond with a 500 status code ', async () => {
    const spy = jest.spyOn(db, 'getAll').mockImplementation(() => {
      throw new Error();
    });
    const response = await request.get('/person');

    expect(response.statusCode).toBe(500);
    spy.mockRestore();
  });
});
