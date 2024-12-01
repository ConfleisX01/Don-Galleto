import { iniciarProcesoDAO } from './DAOProduccion.js';

export async function verifiProcedure(data) {


    // Validación del tipo de datos y rango
    if (typeof data !== 'number') {
        return {
            success: false,
            message: 'El número de orden solo puede contener números'
        };
    }
    if (data <= 0) {
        return {
            success: false,
            message: 'El número de orden no puede ser negativo'
        };
    }

    try {
        // Llamada al DAO
        const response = await iniciarProcesoDAO(data);

        // Verificación del éxito de la operación
        if (response.success) {
            return {
                success: true,
                message: 'Se inició correctamente la actividad'
            };
        } else {
            return {
                success: false,
                message: response.message  // Asegúrate de que `response.message` es lo que deseas retornar
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error en la base de datos'
        };
    }
}
