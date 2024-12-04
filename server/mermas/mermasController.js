import express from 'express'
import {getAllMermas} from './DAO/DAOMermas.js'
import { verifyMerma, verifyMermaEdit, verifyMermaDelete } from '../mermas/CQRS/CQRSMermas.js';

const mermasController = express.Router();

mermasController.get('/getAllMermas', async (req,res) =>{
    try {
        const result = await getAllMermas();
        res.send(result);
    } catch (error) {
        res.status(500).send('error al obtener los mermas')
    }
});

mermasController.post('/putMerma', async (req, res) => {
    const data = req.body;
     try {
        const response = await verifyMerma(data);
        if(response.success){
            res.status(200).send(response);
        }
     } catch (error) {
        console.log(error);
        res.status(500)
     }
});

mermasController.post('/editMerma', async (req, res) => {
    const data = req.body;
     try {
        const response = await verifyMermaEdit(data);
        if(response.success){
            res.status(200).send(response);
        }
     } catch (error) {
        console.log(error);
        res.status(500)
     }
});

mermasController.post('/deleteMermas', async (req, res) => {
    const data = req.body;
    const idMerma = data.idMermañ
     try {
        const response = await verifyMermaDelete(idMerma);
        if(response.success){
            res.status(200).send(response);
        }
     } catch (error) {
        console.log(error);
        res.status(500)
     }
});

export default mermasController;