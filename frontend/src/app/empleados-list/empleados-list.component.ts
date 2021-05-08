import { Component, OnInit } from '@angular/core';
import { EmpleadoListService} from '../service/empleado-list.service';

export class Empleado  {
  constructor 
            ( public id : number,
              public nombres : string, 
              public apellidos: string,
              public sueldo : number,
              public imageUrl: string){}
}

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit {

  empleados  : Empleado[] = [];

  constructor(private empleadoService: EmpleadoListService) { }

  ngOnInit(): void {
    this.empleadoService.getEmployees().subscribe(
      response => {
        this.empleados = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
