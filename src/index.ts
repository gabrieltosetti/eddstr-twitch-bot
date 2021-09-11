import './config/db';
import express from 'express';
import { authRouter } from './routes/auth';

const PORT = process.env.SERVER_PORT || 80;

const app = express();
app.use(express.json());

app.use('/api/user', authRouter);

app.listen(PORT, () => console.log(`Server Up and running on ${PORT}`));