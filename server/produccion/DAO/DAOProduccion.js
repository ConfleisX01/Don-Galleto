import { db } from '../../config.js';  // Correcto para exportaciones nombradas

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

//inicar órdenes de producción
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

//DAO para avanzar de estatus
export async function nextStep(numOrden) {
    return new Promise((resolve, reject) => {
        db.query('call galleto.avanzar_estatus_orden(?);', [numOrden], (error, results) => {
            if (error){
                console.log(error);
                reject({
                    success: false,
                    message: 'Hubo un problema con la base de datos'
                });
            }else{
                resolve({
                    success: true,
                    message: 'Se avanzo al siguiente paso exitosamente'
                });
            }
        });
    })
}

export async function marcarMerma(data) {
    const numOrden = data.data.numOrden;
    const razon = data.data.razon;
    return new Promise((resolve, reject) =>{
        db.query('call galleto.marcar_merma(?, ?);', [numOrden, razon], (error, results) =>{
            if(error){
                console.log(error);
                reject({
                    success: false,
                    message: 'ocurrio un error al enviar los ingredientes a mermas.'
                })
            }else{
                resolve({
                    success: true,
                    message: 'se enviaroon los ingreientes a mermas'
                })
            }
        })
    })
}