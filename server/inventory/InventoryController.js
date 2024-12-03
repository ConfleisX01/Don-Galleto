import express from 'express'
import { getMaterials } from './InventoryDDD'

const app = express()

app.use(express.Router())

app.get('/getExternalMaterials', async (req, res) => {
    const { materialName } = req.body

    try {
        const response = await getMaterials(materialName)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})