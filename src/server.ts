import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { CurrencyRoutes } from './routes/CurrencyRoutes';
import { SwaggerSpec } from './utils/swagger';

const app: Application = express();

const currencyRoutes = new CurrencyRoutes().getRoutes();

app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', currencyRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.port || 3333);

export default app;
