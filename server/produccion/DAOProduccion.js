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
