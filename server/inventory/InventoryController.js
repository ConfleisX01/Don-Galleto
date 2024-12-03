import express from 'express'
import { verifyGetMaterial } from './InventoryCQRS'

const app = express()

const ControllerInventory = express.Router()

app.get('/getExternalMaterials', async (req, res) => {
    const { materialName } = req.body

    try {
        const response = await verifyGetMaterial(materialName)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

export default ControllerInventory