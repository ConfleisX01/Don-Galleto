import { getAllMaterialsFromBase } from "./InventoryDAO"

export async function verifyGetMaterial(materialName) {
    if (materialName || materialName.lenght < 0) return { status: 404, data: 'El nombre del material no respeta el formato o esta vacio' }

    try {
        const response = await getAllMaterialsFromBase(materialName)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, Intentelo nuevamente' }
    }
}