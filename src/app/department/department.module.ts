import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/deparment.create.component';
import { ListComponent } from './list/deparment.list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';

import { DepartmentService } from '../services/department.service';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ],
  exports:[
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  providers: [DepartmentService]
})
export class DepartmentModule { }
