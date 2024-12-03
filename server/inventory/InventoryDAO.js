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
            if (err) {
                reject(err)
            }
            resolve(response)
        })
    })
}