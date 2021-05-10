import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleados-list/empleados-list.component';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  empleado: Empleado = new Empleado(-1, '', '', 0, '');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  crearEmpleado(): void {
    console.log();
  }

}
