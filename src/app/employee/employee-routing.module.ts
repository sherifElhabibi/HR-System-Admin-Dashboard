import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './list/employee.list.component'
import { EmployeeCreateComponent } from './create/employee.create.component';
import { EmployeeEditComponent } from './edit/employee.edit.component';
const routes: Routes = [
  {path: 'list', component:EmployeeListComponent},
  {path: 'create', component:EmployeeCreateComponent},
  {path: 'edit/:emplyeeId', component:EmployeeEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
