import express from 'express'
import { getAllMaterials, updateMaterialQuantity } from '../DAO/InventoryDAO.js'
import { verifyAskForMaterials, verifyGetMaterial } from '../CQRS/InventoryCQRS.js'

const ControllerInventory = express.Router()

ControllerInventory.get('/getExternalMaterials', async (req, res) => {
    const apis = [
        'http://192.168.1.14:4001/inventory/getExternalMaterials',
        'http://192.168.1.14:4001/inventory/getExternalMaterials',
        'http://192.168.1.14:4001/inventory/getExternalMaterials',
    ]

    const materialName = req.query.material

    try {
        const response = await verifyGetMaterial(materialName, apis)
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