const express = require('express');
const app = express();
const port = 3001;
const db = require('./database/conexion');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

// Servir canciones estáticas desde la carpeta 'canciones'
app.use('/canciones', express.static(path.join(__dirname, 'canciones')));


// Ruta para cargar canciones desde la carpeta y guardar en la base de datos
app.get('/api/canciones', (req, res) => {
  // Ruta a la carpeta que contiene las canciones (asegúrate de que la carpeta 'canciones' exista)
  const cancionesFolder = path.join(__dirname, 'canciones');

  fs.readdir(cancionesFolder, (err, files) => {
    if (err) {
      console.error('Error al leer archivos de canciones:', err);
      res.status(500).json({ error: 'Error al cargar canciones' });
    } else {
      const canciones = [];

      // Iterar a través de los archivos y construir objetos de canciones
      files.forEach(file => {
        const title = file.replace(/\.[^.]+$/, ''); // Eliminar la extensión para obtener el título
        const filename = file;
        canciones.push({ title, filename });
      });

      // Devolver la lista de canciones como respuesta
      res.json(canciones);
    }
  });
});

app.get('/api/noticias', async (req, res) => {
  try {
    // Realiza una consulta SQL para seleccionar todas las noticias
    const query = 'SELECT * FROM noticias;';
    const result = await db.query(query); // Utiliza el objeto db para realizar la consulta

    // Devuelve las noticias como respuesta
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// Resto de tu configuración de Express para servir las canciones y demás rutas...

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
