import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './list/employee.list.component'
import { EmployeeCreateComponent } from './create/employee.create.component';
import { EmployeeEditComponent } from './edit/employee.edit.component';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation.component';
import { EmployeeDetailsComponent } from './details/employee.details.component';
import { SalaryComponent } from './salary/salary.component';
import {AuthGuard} from '../models/Login/authGuard';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] }*/ },
  { path: 'create', component: EmployeeCreateComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] } */},
  { path: 'edit/:employeeId', component: EmployeeEditComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] }*/ },
  { path: 'details/:employeeId', component: EmployeeDetailsComponent, /*canActivate: [AuthGuard], data: { Postion: ['HR','Accountant','Admin'] } */},
  { path: 'salary/:employeeId', component: SalaryComponent, /*canActivate: [AuthGuard], data: { Postion: ['Employee', 'Admin','HR'] }*/ },
  { path: 'delete/:employeeId', component: DeleteConfirmationComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] } */},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
