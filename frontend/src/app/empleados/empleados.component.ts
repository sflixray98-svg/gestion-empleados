import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-empleados',
  standalone: false,
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  empleado = new Empleado();
  mensaje = signal('');
  guardando = signal(false);

  constructor(private empleadoService: EmpleadoService) {}

  guardarEmpleado(form: NgForm) {
    if (form.invalid || this.guardando()) {
      form.control.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    this.mensaje.set('');

    this.empleadoService.postEmpleado(this.empleado).subscribe({
      next: (respuesta) => {
        this.limpiarFormulario(form);
        this.mensaje.set(respuesta.mensaje);
        this.guardando.set(false);
      },
      error: () => {
        this.mensaje.set(
          'No se pudo guardar. Revisa los datos y que el servidor esté encendido.'
        );
        this.guardando.set(false);
      }
    });
  }

  limpiarFormulario(form: NgForm) {
    this.empleado = new Empleado();
    form.resetForm(this.empleado);
    this.mensaje.set('');
  }
}