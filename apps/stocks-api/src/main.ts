/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { environment } from './environments/environment';

const Hapi = require('@hapi/hapi');
const Wreck = require('@hapi/wreck');
const CatboxMemory = require('@hapi/catbox-memory');

export const server = Hapi.server({
  port: 3333,
  host: 'localhost',
  cache: [
    {
      name: 'my_cache',
      provider: {
        constructor: CatboxMemory
      }
    }
  ],
  routes: {
    cors: true
  }
});

const getStocksMethod = async (symbol: string, timePeriod: string) => {
  console.log('Grabbing live data');
  const { payload } = await Wreck.get(
    `${environment.apiURL}/beta/stock/${symbol}/chart/${timePeriod}?token=${environment.apiKey}`
  );
  return payload.toString();
}

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      return 'Hello World!';
  }
});

server.route({
  method: 'GET',
  path: '/stock/{symbol}/{timePeriod}',
  options: {
    handler: async function(request, handler) {
      try {
        const { symbol, timePeriod } = request.params;
        const resp = await server.methods.getStocksMethod(symbol, timePeriod);
        return handler.response(resp).type('application/json');
      } catch (error) {
        return error;
      }
    },
    cache: {
      expiresIn: 5 * 60 * 1000,
      privacy: 'private'
    }
  }
});	

server.method('getStocksMethod', getStocksMethod, {
  cache: {
    expiresIn: 5 * 60 * 1000,
    generateTimeout: 10000
  }
});

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
