import axios from 'axios';

export async function getAllMermas() {
    try {
        const response = await axios.get('http://localhost:4001/mermas/getAllMermas');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function insertMerma(data) {
    const response = await axios.post('http://localhost:4001/mermas/putMerma', {
        nombreInsumo: data.nombreInsumo,
        razon: data.razon,
        unidad: data.unidad,
        cantidad: data.cantidad
    });
    if (!response.data.success) {
        console.log(response.data.message)
        return response.data
    } else if (response.data.success) {
        return response.data
    } else {
        return {
            success: false,
            mesagge: 'No fue posible conectarse a la base de datos'
        }
    }
}