import axios from 'axios';

export async function getAllOrdenes() {
    try {
        const response = await axios.get('http://localhost:4001/produccion/getOrdenes');
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function initProcedure(numOrden) {
    const response = await axios.post('http://localhost:4001/produccion/initProcedure', {
        data: numOrden
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
export async function nextStepOrden(numOrden) {
    const response = await axios.post('http://localhost:4001/produccion/next-step', {
        data: numOrden
    });
    if (response.data.success) {
        return response.data;
    } else {
        return {
            success: false,
            mesagge: response.data.mesagge
        }
    }
}
export async function marcarMerma(data) {
    const response = await axios.post('http://localhost:4001/produccion/marcar-merma', {
        data: data
    });
    console.log(response.data)
    if (response.data.success) {
        return response.data
    } else {
        return [
            {
                success: false,
                mesagge: response.data.mesagge
            }
        ]
    }
}



