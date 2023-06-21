import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './list/employee.list.component'
import { EmployeeCreateComponent } from './create/employee.create.component';
import { EmployeeEditComponent } from './edit/employee.edit.component';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation.component';
import { EmployeeDetailsComponent } from './details/employee.details.component';
import { SalaryComponent } from './salary/salary.component';
const routes: Routes = [
  {path: 'list', component:EmployeeListComponent},
  {path: 'create', component:EmployeeCreateComponent},
  {path: 'edit/:emplyeeId', component:EmployeeEditComponent},
  {path: 'details/:emplyeeId', component:EmployeeDetailsComponent},
  {path: 'salary/:emplyeeId', component:SalaryComponent},
  {path: 'delete/:emplyeeId', component:DeleteConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
