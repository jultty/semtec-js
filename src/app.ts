import express, { Application, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

// Configure middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Define a route handler
app.get('/v1/termo', (res: Response) => {
  res.status(200).send('OK');
});

export default app;
