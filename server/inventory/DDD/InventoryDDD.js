import axios from 'axios';

export async function getMaterialFromApis(materialName, url) {
    try {
        const response = await axios.get(url, {
            params: { material: materialName }
        })
        return { status: 200, data: response.data }
    } catch (error) {

    }
}http://192.168.0.112:4001/inventory/getMaterials