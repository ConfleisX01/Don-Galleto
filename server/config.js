import mysql from 'mysql2';

export const SERVER_PORT = 4001;

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'galleto',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos.');
    }
});
