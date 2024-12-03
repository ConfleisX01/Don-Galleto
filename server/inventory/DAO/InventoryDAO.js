import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'galleto'
})

export async function getAllMaterialsFromBase(materialName) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario WHERE nombre_insumo = ?', [materialName], (response, err) => {
            if (err) return resolve({ status: 400, data: err })

            reject({ status: 200, data: response })
        })
    })
}

export async function getAllMaterials() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario', (response, err) => {
            if (err) return resolve({ status: 400, data: err })

            reject({ status: 200, data: response })
        })
    })
}


//! Modificar por un procedure en la base de datos
export async function askedMaterials(idMaterial, quiantity) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM inventario WHERE id_insumo = ?', [idMaterial], (response, err) => {
            const materialQuantity = response.cantidad

            if (err) return resolve({ status: 400, data: err })

            if (quiantity > materialQuantity) return resolve({ status: 400, data: 'La cantidad del material solicitadad no debe de ser mayor a la cantidad disponible' })

            if (quiantity > (materialQuantity / 2)) return resolve({ status: 400, data: 'La cantidad del material solicitadad no debe de ser mayor la mitad de la cantidad disponible' })

            const newQuantity = materialQuantity - quiantity

            connection.query('UPDATE inventario SET cantidad = ? WHERE id_insumo = ?', [newQuantity, idMaterial], (err) => {
                if (err) return reject(err)

                resolve({ status: 200, data: 'La cantidad se pidio de manera exitosa' })
            })
        })
    })
}