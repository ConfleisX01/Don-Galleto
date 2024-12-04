import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'galleto'
})

export async function getAllMaterialsFromBase(materialName) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario WHERE nombre_insumo = ?', [materialName], (err, response) => {
            if (err) {
                return reject({ status: 400, data: err })
            }

            if (response.length === 0) {
                return resolve({ status: 404, data: 'No se encontraron materiales' })
            }

            return resolve({ status: 200, data: response });
        })
    })
}

export async function getAllMaterials() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario', (err, response) => {
            if (err) return reject({ status: 400, data: err })

            resolve({ status: 200, data: response })
        })
    })
}


//! Modificar por un procedure en la base de datos
export async function askedMaterials(idMaterial, quantity) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario WHERE id_insumo = ?', [idMaterial], (err, response) => {
            if (response.length === 0) return reject({ status: 400, data: 'No se encontro el material' })

            const materialQuantity = response[0].cantidad

            if (err) return reject({ status: 400, data: err })

            if (materialQuantity) {
                if (quantity > materialQuantity) return reject({ status: 400, data: 'La cantidad del material solicitadad no debe de ser mayor a la cantidad disponible' })

                if (quantity > (materialQuantity / 2)) return reject({ status: 400, data: 'La cantidad del material solicitada no debe de ser mayor la mitad de la cantidad disponible' })

                const newQuantity = materialQuantity - quantity

                connection.query('UPDATE inventario SET cantidad = ? WHERE id_insumo = ?', [newQuantity, idMaterial], (err) => {
                    if (err) return reject(err)

                    resolve({ status: 200, data: 'La cantidad se pidio de manera exitosa' })
                })
            }

            if (err) return reject({ status: 400, data: "Error al pedir el material" })

        })
    })
}

export async function updateMaterialQuantity(idMaterial, quantity) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario WHERE id_insumo = ?', [idMaterial], (err, response) => {
            if (err) {
                return reject({ status: 500, data: 'Error en la consulta a la base de datos', error: err })
            }

            if (!response || response.length === 0) {
                return reject({ status: 404, data: 'Material no encontrado en el inventario' })
            }

            const materialQuantity = response[0].cantidad
            const newQuantity = materialQuantity + quantity

            connection.query(
                'UPDATE inventario SET cantidad = ? WHERE id_insumo = ?',
                [newQuantity, idMaterial],
                (err) => {
                    if (err) {
                        return reject({ status: 500, data: 'Error al actualizar el inventario', error: err })
                    }

                    resolve({ status: 200, data: 'La cantidad se actualizó de manera exitosa' });
                }
            )
        })
    })
}