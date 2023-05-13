import { CurrencyConverter } from '../utils/CurrencyConverter';

export class CurrencyService {
  private currencyConverter: CurrencyConverter;

  constructor() {
    this.currencyConverter = new CurrencyConverter();
  }

  async convert(currency: string, value: number): Promise<object> {
    try {
      const convertedCurrencies: object = await this.currencyConverter.convert(
        currency,
        value,
      );
      return convertedCurrencies;
    } catch (error) {
      throw new Error('API Error');
    }
  }
}
