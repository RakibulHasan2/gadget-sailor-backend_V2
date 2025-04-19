import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/routes/route.index';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import httpStatus from 'http-status';


const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v2', router);

app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found ',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found ....',
      },
    ],
  });
  next();
});

export default app;
