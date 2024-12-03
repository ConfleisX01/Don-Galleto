import express from 'express'
import { getAllMaterials, getAllMaterialsFromBase, updateMaterialQuantity } from '../DAO/InventoryDAO.js'
import { verifyAskForMaterials } from '../CQRS/InventoryCQRS.js'
import { getMaterialFromApis } from '../DDD/InventoryDDD.js'

const ControllerInventory = express.Router()

ControllerInventory.get('/getSearchedMaterials', async (req, res) => {
    const materialName = req.query.material

    try {
        const materialsFromNorth = await getMaterialFromApis(materialName, 'http://192.168.0.112:4001/inventory/getMaterialsFromBase')
        console.log(materialsFromNorth)
    } catch (error) {
        console.error(error)
    }
});


ControllerInventory.get('/getMaterialsFromBase', async (req, res) => {
    const materialName = req.query.material;

    if (!materialName || materialName.length < 1) {
        return res.status(400).send('El nombre del material no puede estar vacío');
    }

    try {
        const response = await getAllMaterialsFromBase(materialName);

        // Si no se encuentran materiales, devolvemos un 404
        if (response.status === 404) {
            return res.status(404).send(response.data);
        }

        // Si todo es correcto, devolvemos los materiales encontrados
        return res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error al obtener materiales desde la base de datos:', error);
        return res.status(500).send('Error de servidor, intentelo nuevamente');
    }
});


ControllerInventory.get('/getMaterials', async (req, res) => {
    try {
        const response = await getAllMaterials()
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

ControllerInventory.post('/askMaterials', async (req, res) => {
    const { idMaterial, quantity } = req.body

    try {
        const response = await verifyAskForMaterials(idMaterial, quantity)

        if (response.status === 200) {
            const inventoryResponse = await updateMaterialQuantity(idMaterial, quantity)
            res.status(inventoryResponse.status).send(inventoryResponse.data)
        }

        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

export default ControllerInventory