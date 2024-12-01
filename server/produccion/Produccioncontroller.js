import express, { response } from 'express'
import { getAllOrdenes } from './DAOProduccion.js'
import { verifiProcedure } from './CQRSProduccion.js'
const produccionController = express.Router()

//Obtener lista de ordenes
produccionController.get('/getOrdenes', async (req, res) => {
    try {
        const result = await getAllOrdenes();
        res.send(result)
    } catch (error) {
        res.status(500).send('error al obtener las ordenes')
    }

});

//iniciar proceso de preparacion
produccionController.post('/initProcedure', async (req, res) => {
    const datos = req.body;
    const numOrden = datos.data

    try {
        const response = await verifiProcedure(numOrden);
        if (response.success) {
            res.json({
                success: true,
                message: response.message
            }).status(200);
        } else {
            res.status(404).json({
                success: false,
                mesagge: response.message
            })
        }
    } catch (error) {
        console.log(error);

    }
});


export default produccionController;
