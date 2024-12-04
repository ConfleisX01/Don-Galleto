import { iniciarProcesoDAO, nextStep, marcarMerma } from '../DAO/DAOProduccion.js';

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
                message: response.message
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

export async function verifyNextStep(numOrden) {
    // Validación del tipo de datos y rango
    if (typeof numOrden !== 'number') {
        return {
            success: false,
            message: 'El número de orden solo puede contener números'
        };
    }
    if (numOrden <= 0) {
        return {
            success: false,
            message: 'El número de orden no puede ser negativo'
        };
    }

    try {
        const response = await nextStep(numOrden)

        if (response.success) {
            return {
                success: true,
                message: response.message
            };
        } else {
            return {
                success: false,
                message: response.message
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

export async function verifyMerma(data) {
    // Validación de numOrden: debe ser un número entero positivo
    if (!Number.isInteger(data.data.numOrden) || data.data.numOrden <= 0) {
        return {
            success: false,
            message: "El número de orden debe ser un entero positivo."
        };
    }

    if (typeof data.data.razon !== "string" || data.data.razon.trim() === "") {
        return {
            success: false,
            message: "La razón debe ser una cadena de texto no vacía."
        };
    }
    const forbiddenChars = /['";]|--/; // Ajusta para buscar el guion doble como secuencia
    if (forbiddenChars.test(data.data.razon)) {
        throw new Error("La razón contiene caracteres prohibidos.");
    }

    try {
        const response = await marcarMerma(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

