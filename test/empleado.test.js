const test = require('node:test');
const assert = require('node:assert/strict');
const Empleado = require('../backend/models/empleado');

test('Acepta un empleado con datos válidos', () => {
  const empleado = new Empleado({
    name: 'Empleado de prueba',
    position: 'Auxiliar',
    office: 'Bogota',
    salary: 2000000
  });

  assert.equal(empleado.validateSync(), undefined);
});

test('Rechaza un empleado sin nombre', () => {
  const empleado = new Empleado({
    position: 'Auxiliar',
    office: 'Bogota',
    salary: 2000000
  });

  const error = empleado.validateSync();

  assert.ok(error);
  assert.ok(error.errors.name);
});

test('Rechaza un salario negativo', () => {
  const empleado = new Empleado({
    name: 'Empleado de prueba',
    position: 'Auxiliar',
    office: 'Bogota',
    salary: -100
  });

  const error = empleado.validateSync();

  assert.ok(error);
  assert.ok(error.errors.salary);
});

test('Rechaza un salario que no sea numérico', () => {
  const empleado = new Empleado({
    name: 'Empleado de prueba',
    position: 'Auxiliar',
    office: 'Bogota',
    salary: 'texto'
  });

  const error = empleado.validateSync();

  assert.ok(error);
  assert.ok(error.errors.salary);
});