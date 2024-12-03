import axios from 'axios'

export async function getMaterialFromApis(materialName, apis) {
    try {
        const promises = apis.map((apiUrl) =>
            axios.get(apiUrl, {
                params: { materialName },
            })
        );

        const responses = await Promise.all(promises)

        return responses.map((response) => response.data)
    } catch (error) {
        console.error('Error al obtener material de las APIs');
        return [];
    }
}

export async function askForMaterials(idMaterial, quiantity) {
    
}