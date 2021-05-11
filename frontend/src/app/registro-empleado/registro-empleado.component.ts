import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleados-list/empleados-list.component';
import { EmpleadoListService } from '../service/empleado-list.service';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

  empleado: Empleado; 

  constructor(private empleadoService: EmpleadoListService,
              private router: Router) { }

  ngOnInit(): void {
    this.empleado = new Empleado(-1, '', '', 0, '');
  }

  crearEmpleado(): void {
    this.empleadoService.postEmployee(this.empleado).subscribe(
      response => {
        this.router.navigate(["empleados"]);
      }
    );
  }

}
