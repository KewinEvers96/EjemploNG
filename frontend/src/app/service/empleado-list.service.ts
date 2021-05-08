import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado }  from '../empleados-list/empleados-list.component';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoListService {

  constructor(private http : HttpClient) { }

  public getEmployees()  {
    return this.http.get<Empleado[]>("http://localhost:8000/employees");
  }

  public postEmployee(empleado : Empleado) {
    return this.http.post("http://localhost:8000/employees", 
                          empleado);
  }

}
