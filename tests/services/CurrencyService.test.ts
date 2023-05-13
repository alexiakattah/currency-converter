import axios from 'axios';
import { CurrencyService } from '../../src/services/CurrencyService';

jest.mock('axios');

describe('CurrencyService', () => {
  describe('convertCurrency', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    it('should return the converted currency when the API request is successful', async () => {
      const expected = {
        USD: 10,
        EUR: 8.41,
        INR: 735.27,
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          rates: {
            USD: 1,
            EUR: 0.841234,
            INR: 73.527,
          },
        },
      });
      const currencyService = new CurrencyService();

      const result = await currencyService.convert('BRL', 10);

      expect(result).toEqual(expected);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.apilayer.com/exchangerates_data/latest?base=BRL',
        {
          headers: {
            apiKey: process.env.API_KEY_APILAYER,
          },
        },
      );
    });

    // it('should throw an error when the API request fails', async () => {
    //   mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    //   await expect(new CurrencyService().convert('BRL', 10)).rejects.toThrow(
    //     'API Error',
    //   );
    //   expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    // });
  });
});
