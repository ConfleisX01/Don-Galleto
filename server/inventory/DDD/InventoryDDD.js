import axios from 'axios';

export async function getMaterialFromApis(materialName, url) {
    try {
        const response = await axios.get(url, {
            params: { material: materialName }
        })

        const mappedResponse = {status: response.status, url: url, data: response.data}

        return mappedResponse
    } catch (error) {
        console.error(error)
    }
}