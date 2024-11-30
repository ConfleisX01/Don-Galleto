import express from 'express'
import cors from 'cors'
import { SERVER_PORT } from'./config.js';
import produccionController from './produccion/Produccioncontroller.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/produccion', produccionController);

app.listen(SERVER_PORT, () => {
    console.log('http://localhost:' + SERVER_PORT)
})