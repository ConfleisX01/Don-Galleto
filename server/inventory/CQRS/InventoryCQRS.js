import { askedMaterials } from "../DAO/InventoryDAO.js"
import { getMaterialFromApis } from "../DDD/InventoryDDD.js"

export async function verifyGetMaterial(materialName, apis) {
    if (!materialName || materialName.length < 1) {
        return { status: 404, data: 'El nombre del material no respeta el formato o está vacío' }
    }

    try {
        const response = await getMaterialFromApis(materialName, apis)
        return response
    } catch (error) {
        console.error('Error al obtener materiales:', error);
        return { status: 500, data: 'Error de servidor, intentelo nuevamente' }
    }
}


export async function verifyAskForMaterials(idMaterial, quantity) {
    if (!idMaterial || idMaterial < 0) return { status: 404, data: 'El id del material no puede estar vacio' }

    if (!quantity || quantity < 0) return { status: 404, data: 'La cantidad del material no puede estar vacia o ser menor a 0' }

    try {
        const response = await askedMaterials(idMaterial, quantity)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, Intentelo nuevamente' }
    }
}