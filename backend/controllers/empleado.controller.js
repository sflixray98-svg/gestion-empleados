const Empleado = require('../models/empleado');
const mongoose = require('mongoose');

// Consultar todos los empleados.
async function obtenerEmpleados(req, res) {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({
      mensaje: 'No fue posible consultar los empleados.'
    });
  }
}

// Registrar un empleado.
async function crearEmpleado(req, res) {
  try {
    const { name, position, office, salary } = req.body || {};

    const empleado = new Empleado({
      name,
      position,
      office,
      salary
    });

    await empleado.save();

    res.status(201).json({
      mensaje: 'Empleado guardado correctamente.',
      empleado
    });
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({
        mensaje: 'Completa los campos y verifica que el salario sea un número mayor o igual a cero.'
      });
    }

    res.status(500).json({
      mensaje: 'No fue posible guardar el empleado.'
    });
  }
}

// Editar un empleado.
async function actualizarEmpleado(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        mensaje: 'El ID del empleado no es válido.'
      });
    }

    const { name, position, office, salary } = req.body || {};

    const empleado = await Empleado.findByIdAndUpdate(
      id,
      { name, position, office, salary },
      { new: true, runValidators: true }
    );

    if (!empleado) {
      return res.status(404).json({
        mensaje: 'Empleado no encontrado.'
      });
    }

    res.json({
      mensaje: 'Empleado actualizado correctamente.',
      empleado
    });
  } catch (error) {
    if (
      error.name === 'ValidationError' ||
      error.name === 'CastError'
    ) {
      return res.status(400).json({
        mensaje: 'Los datos del empleado no son válidos.'
      });
    }

    res.status(500).json({
      mensaje: 'No fue posible actualizar el empleado.'
    });
  }
}

// Eliminar un empleado.
async function eliminarEmpleado(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        mensaje: 'El ID del empleado no es válido.'
      });
    }

    const empleado = await Empleado.findByIdAndDelete(id);

    if (!empleado) {
      return res.status(404).json({
        mensaje: 'Empleado no encontrado.'
      });
    }

    res.json({
      mensaje: 'Empleado eliminado correctamente.'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'No fue posible eliminar el empleado.'
    });
  }
}

module.exports = {
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
};