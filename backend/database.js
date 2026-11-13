const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/empleados';

async function conectarBaseDatos() {
  await mongoose.connect(URI);
  console.log('Base de datos MongoDB conectada correctamente.');
}

module.exports = conectarBaseDatos;