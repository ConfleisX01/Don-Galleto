import express from 'express'
import { getAllMaterials } from '../DAO/InventoryDAO.js'
import { verifyGetMaterial } from '../CQRS/InventoryCQRS.js'

const ControllerInventory = express.Router()

ControllerInventory.get('/getExternalMaterials', async (req, res) => {
    const materialName = req.query.material

    res.send(materialName)

    try {
        const response = await verifyGetMaterial('Leche')
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

ControllerInventory.get('/getMaterials', async (req, res) => {
    try {
        const response = await getAllMaterials()
        res.status(200).send(response)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

export default ControllerInventory