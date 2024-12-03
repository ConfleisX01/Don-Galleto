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
})

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