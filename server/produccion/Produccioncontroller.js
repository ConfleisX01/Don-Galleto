import express from 'express'
import { getAllOrdenes } from './DAOProduccion.js'
const produccionController = express.Router()

//Obtener lista de ordenes
produccionController.get('/getOrdenes', async (req, res) => {
    try {
        const result = await getAllOrdenes();
        res.json({
            message: 'success',
            response: result
        })
    } catch (error) {
        res.status(500).send('error al obtener las ordenes')
    }

});


export default produccionController;
