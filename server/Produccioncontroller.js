import express, { response } from 'express'
import { getAllOrdenes } from './produccion/DAO/DAOProduccion.js'
import { verifiProcedure, verifyNextStep, verifyMerma } from './produccion/CQRS/CQRSProduccion.js'
import { getAllInventario } from './Inventario/DAOInventario.js';
import { toPublic  } from './Inventario/MVVM/MVVMInventario.js';
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
    const numOrden = datos.data;

    try {
        const response = await verifiProcedure(numOrden);
        if (response.success) {
            return res.status(200).json({
                success: true,
                message: response.message
            });
        } else {
            console.log(response.message)
            return res.json({
                success: false,
                message: response.message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

//avanzar estado de la tarea
produccionController.post('/next-step', async (req, res) => {
    const datos = req.body;
    const numOrden = datos.data;
    try {
        const response = await verifyNextStep(numOrden);
        if (response.success) {
            return res.status(200).json({
                success: true,
                message: response.message
            });
        } else {
            console.log(response.message)
            return res.json({
                success: false,
                message: response.message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

produccionController.post('/marcar-merma', async (req, res) =>{
    const data = req.body;


    try {
        const response = await verifyMerma(data);
        res.status(200).json({
            success: response.success,
            message: response.message
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        })
    }
});


produccionController.get('/inventarioPublico', async (req, res) =>{
    try{
        const result = await getAllInventario();
        const lista = await toPublic(result);
        res.send(lista)
    }catch(error){
        console.log(error);
        res.status(500).send('error en la base de datos');
    }
});


export default produccionController;
