import axios from 'axios'

export async function getMaterials(materialName) {
    try {
        const response = await axios.get('http://192.168.1.14:4001/inventory/getExternalMaterials', {
            params: { materialName }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}