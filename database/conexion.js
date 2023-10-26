const pgp = require('pg-promise')();
require('dotenv').config();


// obtener credenciales desde el archivo env
const user = process.env.USER;
const pass = process.env.PASS;
const host = process.env.HOST;
const database = process.env.DB;

// conexion de base de datos
const cn = `postgresql://${user}:${pass}@${host}:5432/${database}`;

// Crea la instancia de la base de datos
const db = pgp(cn);

// conexion a la base de ddatos
db.connect()
  .then(() => {
    console.log("Conexión a la base de datos realizada correctamente");
  })
  .catch((err) => {
    console.error(`Error al iniciar la conexión a la base de datos: ${err}`);
  });

module.exports = db; 
