import axios from 'axios';

export class CurrencyConverter {
  async convert(currency: string, value: number) {
    const currencies = ['USD', 'EUR', 'INR', 'BRL'];
    const convertedCurrencies: { [key: string]: number } = {};

    try {
      if (!currencies.includes(currency)) {
        throw new Error('Invalid currency code');
      }
      const res = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?base=${currency}`,
        {
          headers: {
            apiKey: process.env.API_KEY_APILAYER,
          },
        },
      );

      for (const currencyEach of currencies) {
        if (currencyEach !== currency) {
          const rate = res.data.rates[currencyEach];

          convertedCurrencies[currencyEach] = parseFloat(
            (value * rate).toFixed(2),
          );
        }
      }

      return convertedCurrencies;
    } catch (error) {
      return new Error('API Error');
    }
  }
}
