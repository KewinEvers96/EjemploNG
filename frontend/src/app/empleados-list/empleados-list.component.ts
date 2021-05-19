import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoListService} from '../service/empleado-list.service';

export class Empleado  {
  constructor(public id: number,
              public name: string,
              public lastname: string,
              public salary: number,
              public imageUrl: string){}
}

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit {

  empleados: Empleado[] = [];
  previousPage = -1;
  page = -1;
  nextPage = 1;
  sub: any;

  constructor(private empleadoService: EmpleadoListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        if ( params.number ){
          this.page = parseInt(params.number);
          this.nextPage = this.page + 1;
          this.previousPage = this.page - 1;
          this.loadEmployees(this.page);
        } else{
          this.loadEmployees();
        }
      }
    );
  }

  loadEmployees(page: number = 0): void{
    if ( page > 0 ){
      this.empleadoService.getEmployeesPage(page).subscribe(
        response => {
          this.empleados = response;
        }, error => {
          console.log(error);
        }
      );
    }else{
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

  loadRegisterEmployee(): void {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  loadUpdateEmployeeForm(id: number): void {
    this.router.navigate([`${id}/edit`], {relativeTo: this.route});
  }

  deleteEmployee(id: number): void{
    this.empleadoService.deleteEmployee(id).subscribe(
      response => {
        console.log(response);
        this.loadEmployees();
      }, error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

}
