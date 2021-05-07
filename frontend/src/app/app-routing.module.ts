import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosListComponent } from './empleados-list/empleados-list.component';

const routes: Routes = [
  {path: "empleados", component: EmpleadosListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
