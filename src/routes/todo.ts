import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/todo', (req: Request, res: Response) => {
    return res.json({msg: "teste"});
});

export { router as todoRouter }