import express from 'express'
import { getAllMaterials, getAllMaterialsFromBase, updateMaterialQuantity } from '../DAO/InventoryDAO.js'
import { verifyAskForMaterials } from '../CQRS/InventoryCQRS.js'
import { getMaterialFromApis } from '../DDD/InventoryDDD.js'

const ControllerInventory = express.Router()

// Funcion para buscar los materiales en las demas sucursales
ControllerInventory.get('/getSearchedMaterials', async (req, res) => {
    const materialName = req.query.material

    try {
        const materialsFromNorth = await getMaterialFromApis(materialName, 'http://192.168.0.112:4001/inventory/getMaterialsFromBase')
        console.log(materialsFromNorth)
    } catch (error) {
        console.error(error)
    }
});

// Funcion para obtener los materiales de la base de datos local
ControllerInventory.get('/getMaterialsFromBase', async (req, res) => {
    const materialName = req.query.material

    try {
        const response = await getAllMaterialsFromBase(materialName)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

// Funcion para obtener todos los materiales de la base de datos local
ControllerInventory.get('/getMaterials', async (req, res) => {
    try {
        const response = await getAllMaterials()
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

// Funcion para pedir los materiales
ControllerInventory.post('/askMaterials', async (req, res) => {
    const { idMaterial, quantity } = req.body

    try {
        const response = await verifyAskForMaterials(idMaterial, quantity) // Verificamos las entradas del material

        if (response.status === 200) {
            const inventoryResponse = await updateMaterialQuantity(idMaterial, quantity) // Actualizamos a la nueva cantidad del material dado de manera local
            res.status(inventoryResponse.status).send(inventoryResponse.data)
        }

        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

export default ControllerInventory