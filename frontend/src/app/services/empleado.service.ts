import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';

interface RespuestaEmpleado {
  mensaje: string;
  empleado: Empleado;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private readonly URL_API =
    'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  postEmpleado(empleado: Empleado) {
    return this.http.post<RespuestaEmpleado>(
      this.URL_API,
      empleado
    );
  }

  putEmpleado(empleado: Empleado) {
    return this.http.put<RespuestaEmpleado>(
      `${this.URL_API}/${empleado._id}`,
      empleado
    );
  }

  deleteEmpleado(id: string) {
    return this.http.delete<{ mensaje: string }>(
      `${this.URL_API}/${id}`
    );
  }
}