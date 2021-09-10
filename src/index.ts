import express from 'express';
import { todoRouter } from './routes/todo';

const PORT = process.env.SERVER_PORT || 80;

const app = express();
app.use(express.json());

app.use(todoRouter);

app.listen(PORT, () => console.log(`Server Up and running on ${PORT}`));