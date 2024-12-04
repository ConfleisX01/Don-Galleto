import express from 'express'
import { getAllMaterials, getAllMaterialsFromBase, updateMaterialQuantity } from '../DAO/InventoryDAO.js'
import { verifyAskForMaterials, verifyUpdateMaterial } from '../CQRS/InventoryCQRS.js'
import { getMaterialFromApis } from '../DDD/InventoryDDD.js'

const ControllerInventory = express.Router()

// Funcion para buscar los materiales en las demas sucursales
ControllerInventory.get('/getSearchedMaterials', async (req, res) => {
    const materialName = req.query.material

    const apis = [
        'https://27mbkpbq-4001.usw3.devtunnels.ms/inventory/getMaterialsFromBase'
    ]

    try {
        const materialsFromNorth = await getMaterialFromApis(materialName, apis[0])
        res.status(materialsFromNorth.status).send(materialsFromNorth.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

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
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

// Funcion para actualizar la cantidad de un insumo en el inventario
ControllerInventory.post('/updateMaterialQuantity', async (req, res) => {
    const { idMaterial, quantity } = req.body

    try {
        const response = await verifyUpdateMaterial(idMaterial, quantity)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo nuevamente')
    }
})

export default ControllerInventory