import express from 'express'
import cors from 'cors'
import { SERVER_PORT } from './config.js'
import { insertSale, deleteCookiesFromSale, getAllSales } from "./pos/daoPos.js";
import { validarInsertCookiesSale } from "./pos/cqrsPos.js";


const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

/* Inicio seccion ventas (Luis García) */

app.get('/pos/getAllSales', async (req, res) => {
    try {
        const respuesta = await getAllSales();
        res.send(respuesta);
    } catch (error) {
        console.error(error);
    }
})

app.post('/pos/insertSale', async (req, res) => {
    const galletas = req.body;
    try {
        let respuesta = "";
        const idVenta = await insertSale();
        for (const galleta of galletas) {
            respuesta = await validarInsertCookiesSale(galleta.idGalleta, idVenta[0][0].idVenta, galleta.cantidad, galleta.tipo)
            await deleteCookiesFromSale(galleta.idGalleta, galleta.cantidad)
        }
        res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
});

/* Final seccion ventas (Luis García) */

app.listen(SERVER_PORT, () => {
    console.log('http://localhost:' + SERVER_PORT)
})