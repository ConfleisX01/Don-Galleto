import { db } from '../config.js';  // Correcto para exportaciones nombradas

// Obtener órdenes de producción
export async function getAllOrdenes() {
    const query = 'SELECT * FROM galleto.orden_prioridad';
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error al obtener las órdenes'));
            } else {
                resolve(results);
            }
        });
    });
}


export async function iniciarProcesoDAO(ordenId) {
    return new Promise((resolve, reject) => {
        // Ejecuta el procedimiento almacenado primero
        const query1 = 'CALL iniciar_proceso(?, @mensaje_error);';
        db.query(query1, [ordenId], (error, results) => {
            if (error) {
                console.log(error);
                reject({
                    success: false,
                    message: 'Error en la ejecución del procedimiento.',
                });
            } else {
                // Luego, consulta el valor de la variable de salida
                const query2 = 'SELECT @mensaje_error AS mensaje_error;';
                db.query(query2, (error, results2) => {
                    if (error) {
                        console.log(error);
                        reject({
                            success: false,
                            message: 'Error al obtener el mensaje de error.',
                        });
                    } else {
                        const mensajeError = results2[0]?.mensaje_error;
                        if (mensajeError) {
                            resolve({
                                success: false,
                                message: mensajeError,
                            });
                        } else {
                            resolve({
                                success: true,
                                message: 'Proceso iniciado correctamente.',
                            });
                        }
                    }
                });
            }
        });
    });
}
