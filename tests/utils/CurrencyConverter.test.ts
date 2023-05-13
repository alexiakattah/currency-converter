import { CurrencyConverter } from '../../src/utils/CurrencyConverter';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('CurrencyConverter tests', () => {
  const currencyConverter = new CurrencyConverter();
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
  });

  test('convert should return an empty object if invalid currency is passed', async () => {
    const apiResponse = ['Error: API Error'];
    mock
      .onGet(`https://api.apilayer.com/exchangerates_data/latest?base=ABC`, {
        headers: { apiKey: process.env.API_KEY_APILAYER },
      })
      .reply(200, apiResponse);

    const result = await currencyConverter.convert('ABC', 10);

    expect(result).toEqual(new Error('API Error'));
  });

  test('convert should round the result to 2 decimal places', async () => {
    const apiResponse = {
      success: true,
      timestamp: 1649834632,
      base: 'USD',
      date: '2022-04-12',
      rates: {
        EUR: 0.184887,
        INR: 16.660777,
        USD: 0.203297,
      },
    };
    mock
      .onGet(`https://api.apilayer.com/exchangerates_data/latest?base=BRL`, {
        headers: { apiKey: process.env.API_KEY_APILAYER },
      })
      .reply(200, apiResponse);

    const expectedUSD = parseFloat((10 * apiResponse.rates.USD).toFixed(2));
    const expectedEUR = parseFloat((10 * apiResponse.rates.EUR).toFixed(2));
    const expectedINR = parseFloat((10 * apiResponse.rates.INR).toFixed(2));
    const result = await currencyConverter.convert('BRL', 10);

    expect(result).toEqual({
      USD: expectedUSD,
      EUR: expectedEUR,
      INR: expectedINR,
    });
  });
});
