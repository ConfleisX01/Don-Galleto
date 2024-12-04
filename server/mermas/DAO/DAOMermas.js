import {db} from '../../config.js'

export async function getAllMermas() {
    const query = 'SELECT * FROM galleto.mermas';
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

export async function putMerma(data) {
    return new Promise((resolve, reject) => {
        db.query('CALL insertar_merma(?,?,?)', [data.nombre_insumo, data.cantidad, data.razon_merma], (error, results) =>{
            if(error){
                console.log(error);
                reject({
                    success: false,
                    mesagge: 'Error al ejecutar el procedure'
                });
            }
            resolve({
                success: true,
                mesagge: 'Se agrego a mermas correctaemnte'
            })
        }); 
    })
}

export async function editMerma(data) {
    return new Promise((resolve, reject) => {
        db.query('CALL editar_Merma(?,?,?,?)', [data.idMerma, data.nombre_insumo, data.cantidad, data.razon], (error, results) =>{
            if(error){
                console.log(error);
                reject({
                    success: false,
                    mesagge: 'Error al ejecutar el procedure'
                });
            }
            resolve({
                success: true,
                mesagge: 'Se edito merma correctaemnte'
            })
        }); 
    })
}

export async function deleteMerma(data) {
    return new Promise((resolve, reject) => {
        db.query('CALL eliminar_merma(?)', [data], (error, results) =>{
            if(error){
                console.log(error);
                reject({
                    success: false,
                    mesagge: 'Error al ejecutar el procedure'
                });
            }
            resolve({
                success: true,
                mesagge: 'Se edito merma correctaemnte'
            })
        }); 
    })
}
