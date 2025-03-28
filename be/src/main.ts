import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { HandleError } from './types/errors';

// Routes
import recipesRouter from './routes/recipes';

dotenv.config();

const app = express();

// Configure CORS, Logger and json parser
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());

// CRUD
app.use('/api/recipes', recipesRouter);

// 404
app.use((req: Request, res: Response) => {
  const error = new Error('Not Found - ' + req.originalUrl);
  res.status(404).json({ message: error.message });
});

// 500
app.use((err: HandleError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

export default app;
