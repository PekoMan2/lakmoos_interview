import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events.routes';

const app = express();

app.use(cors({
    origin: 'http://localhost:4173',
    methods: 'GET,POST,PUT,DELETE',
  }));
  
app.use(express.json());

app.use('/events', eventsRouter);

export default app;
