import axios from 'axios';

export async function getMaterialFromApis(materialName, url) {
    try {
        const response = await axios.get(url, {
            params: { material: materialName }
        })

        return response
    } catch (error) {
        console.error(error)
    }
}