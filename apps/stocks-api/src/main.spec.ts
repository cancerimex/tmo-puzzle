import { server } from './main';

beforeAll((done) => {
  server.events.on('start', () => {
      done();
  });
});

afterAll((done) => {
  server.events.on('stop', () => {
      done();
  });
  server.stop();
});

test('should success with server connection', async function () {
  const options = {
      method: 'GET',
      url: '/'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});

test('should get response ', async function () {
  const data = await server.inject('/stock/AAPL/1m');
  expect(data.statusCode).toBe(200);
});

test('should have cache headers and respond instantly', async function () {
  const data = await server.inject('/stock/AAPL/1m');
  expect(data.statusCode).toBe(200);
  expect(data.headers['cache-control']).toBe('max-age=300, must-revalidate, private');
});
