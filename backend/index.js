const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const conectarBaseDatos = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración.
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(morgan('dev'));
app.use(express.json());

// Rutas de empleados.
app.use('/api/empleados', require('./routes/empleado.routes'));

// Inicio del servidor.
async function iniciarServidor() {
  try {
    await conectarBaseDatos();

    app.listen(PORT, () => {
      console.log(`Servidor disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

iniciarServidor();