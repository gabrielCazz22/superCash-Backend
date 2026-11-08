import express from 'express'
import itemRouter from './routes/item.router.js';
import cors from 'cors'
import authRouter from './routes/auth.router.js';
import dotenv from 'dotenv';

const app = express();
const port = 3000;
dotenv.config()

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRouter);

app.use('/api/auth', authRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status:
            'ok', message: 'Esta funcionando la api de supercash'
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});