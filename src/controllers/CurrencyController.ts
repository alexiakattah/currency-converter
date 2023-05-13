import { Request, Response } from 'express';
import { CurrencyService } from '../services/CurrencyService';

export class CurrencyController {
  private currencyService: CurrencyService;

  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
  }

  async convert(req: Request, res: Response): Promise<void> {
    const { currency, value } = req.params;

    try {
      if (!Number(value)) {
        res.status(400).json({
          message: 'Invalid input. Please enter a valid numeric value.',
        });
        return;
      }
      const result = await this.currencyService.convert(
        currency,
        Number(value),
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error converting currencies' });
    }
  }
}
