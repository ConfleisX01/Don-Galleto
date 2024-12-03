import axios from 'axios'

export async function getMaterials(materialName) {
    try {
        const response = await axios.get('http://10.16.5.154:4001/produccion/inventarioPublico')
        return response
    } catch (error) {
        console.error(error)
    }
}