import request from 'supertest';
import app from '../../src/server';

describe('Currency conversion controller', () => {
  describe('GET /v1/convert/BRL/{value}', () => {
    it('should return status code 200 and converted values for valid input', async () => {
      const response = await request(app).get('/v1/convert/BRL/1000');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        USD: expect.any(Number),
        EUR: expect.any(Number),
        INR: expect.any(Number),
      });
    });

    it('should return status code 400 for invalid input', async () => {
      const response = await request(app).get('/v1/convert/BRL/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Invalid input. Please enter a valid numeric value.',
      });
    });
  });

  describe('GET /v1/convert/USD/{value}', () => {
    it('should return status code 200 and converted values for valid input', async () => {
      const response = await request(app).get('/v1/convert/USD/100');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        EUR: expect.any(Number),
        INR: expect.any(Number),
        BRL: expect.any(Number),
      });
    });

    it('should return status code 400 for invalid input', async () => {
      const response = await request(app).get('/v1/convert/USD/invalid');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Invalid input. Please enter a valid numeric value.',
      });
    });
  });
});
