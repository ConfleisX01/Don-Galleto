import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'galleto'
});

export function getAllSales() {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM ventas',
            (err, result) => {
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

export function getAllSalesDetails(idVenta) {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM vista_ventas_detalle WHERE id_venta = ?',
            [idVenta],
            (err, result) => {
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

export function getAllCookies() {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM galletas',
            (err, result) => {
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

export function insertSale() {
    return new Promise((resolve, reject) => {
        db.query(
            'CALL sp_insertSale()',
            [],
            (err, result) => {
                if (err) {
                    console.error('Error ejecutando el procedimiento almacenado:', err.sqlMessage);
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

export function insertCookiesSale(idGalleta, idVenta, cantidad, tipoCantidade) {
    return new Promise((resolve, reject) => {
        db.query(
            'CALL sp_insertCookiesSale(?,?,?,?)',
            [idGalleta, idVenta, cantidad, tipoCantidade],
            (err, result) => {
                if (err) {
                    console.error('Error ejecutando el procedimiento almacenado:', err.sqlMessage);
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

export function deleteCookiesFromSale(idGalleta, cantidad) {
    return new Promise((resolve, reject) => {
        db.query(
            'CALL sp_deleteCookiesFromSale(?,?)',
            [idGalleta, cantidad],
            (err, result) => {
                if (err) {
                    console.error('Error ejecutando el procedimiento almacenado:', err.sqlMessage);
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}