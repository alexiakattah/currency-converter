import { Router } from 'express';
import { CurrencyController } from '../controllers/CurrencyController';
import { CurrencyService } from '../services/CurrencyService';

export class CurrencyRoutes {
  private router: Router;
  private currencyController: CurrencyController;

  constructor() {
    this.router = Router();
    this.currencyController = new CurrencyController(new CurrencyService());
  }

  getRoutes(): Router {
    /**
     * @swagger
     * /v1/convert/{currency}/{value}:
     *   get:
     *     summary: Convert currency value
     *     description: Convert a given value from a specific currency to other currencies based on the latest exchange rates.
     *     parameters:
     *       - in: path
     *         name: currency
     *         required: true
     *         description: The currency code to convert from.
     *         schema:
     *           type: string
     *       - in: path
     *         name: value
     *         required: true
     *         description: The value to be converted.
     *         schema:
     *           type: number
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 USD:
     *                   type: number
     *                   description: The converted value to USD.
     *                 EUR:
     *                   type: number
     *                   description: The converted value to EUR.
     *                 INR:
     *                   type: number
     *                   description: The converted value to INR.
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */

    this.router.get(
      '/convert/:currency/:value',
      this.currencyController.convert.bind(this.currencyController),
    );
    return this.router;
  }
}
