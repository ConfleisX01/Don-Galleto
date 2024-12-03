import { db } from '../config.js';  // Correcto para exportaciones nombradas

// Obtener órdenes de producción
export async function getAllInventario() {
    const query = 'SELECT * FROM galleto.inventario';
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error al obtener las órdenes'));
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}