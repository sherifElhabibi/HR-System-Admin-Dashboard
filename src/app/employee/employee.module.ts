import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from '../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { EmployeeListComponent } from './list/employee.list.component';
import { EmployeeDeleteComponent } from './delete/employee.delete.component';
import { EmployeeCreateComponent } from './create/employee.create.component';
import { EmployeeEditComponent } from './edit/employee.edit.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeDeleteComponent,
    EmployeeEditComponent,

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
