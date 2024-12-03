import axios from 'axios';

export async function getMaterialFromApis(materialName, apis) {
    try {
        // Crear un array de promesas para todas las solicitudes a las APIs
        const promises = apis.map((apiUrl) =>
            axios.get(apiUrl, { params: { material: materialName } })
                .catch((error) => {
                    // Si alguna de las solicitudes falla, capturamos el error y lo devolvemos
                    return { error: error.message, apiUrl };
                })
        );

        // Esperamos que todas las promesas se resuelvan
        const responses = await Promise.all(promises);

        // Filtramos las respuestas exitosas
        const successfulResponses = responses.filter(response => !response.error);
        const failedResponses = responses.filter(response => response.error);

        // Mostrar los errores para depuración
        if (failedResponses.length > 0) {
            failedResponses.forEach(({ error, apiUrl }) => {
                console.error(`Error en API: ${apiUrl}, Error: ${error}`);
            });
        }

        // Si no hubo respuestas exitosas
        if (successfulResponses.length === 0) {
            return { status: 404, data: 'No se encontraron materiales en las APIs.' };
        }

        // Si hubo respuestas exitosas, las devolvemos
        return { status: 200, data: successfulResponses.map(response => response.data) };
    } catch (error) {
        console.error('Error al hacer las solicitudes a las APIs:', error);
        return { status: 500, data: 'Error al obtener los materiales de las APIs.' };
    }
}


export async function askForMaterials(idMaterial, quiantity) {
    
}