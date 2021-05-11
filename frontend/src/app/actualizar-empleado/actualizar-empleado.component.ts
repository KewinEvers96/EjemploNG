import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleados-list/empleados-list.component';
import { EmpleadoListService } from '../service/empleado-list.service';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  empleado: Empleado;
  id: number;
  message: string;

  constructor(private empleadoService: EmpleadoListService,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params.id;
    this.loadEmployee();
  }

  loadEmployee(): void{
    this.empleadoService.getEmployeeById(this.id).subscribe(
      response => {
        this.empleado = response;
      }, error => {
        this.router.navigate(['/empleados'], {replaceUrl: true});
      }
    );
  }

  updateEmployee(id: number): void{
    this.empleadoService.updateEmployeeId(id, this.empleado).subscribe(
      response => {
        this.message = response.message;
        this.loadEmployee();
      }, error => {
        this.message = error.message;
      }
    );
  }

}
