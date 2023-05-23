import request from 'supertest';
import { Server } from '../../../src/app/server';
import { slug } from '../../../src/routes/test.router';

describe('Server', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server();
  });

  afterEach(() => {
    server.stop();
  });

  it('should return "Test route" when accessing the "/test" route', async () => {
    const app = server.start();
    const response = await request(app).get(`/v1/${slug}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Test route');
  });
});
