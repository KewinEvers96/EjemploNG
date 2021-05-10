import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosListComponent } from './empleados-list/empleados-list.component';
import { RegistroEmpleadoComponent } from './registro-empleado/registro-empleado.component';

const routes: Routes = [
  {path: 'empleados', component: EmpleadosListComponent},
  {path: 'empleados/new', component : RegistroEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
