import express from 'express'
import itemRouter from './routes/item.router.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/items', itemRouter);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status:
            'ok', message: 'Esta funcionando la api de supercash'
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});