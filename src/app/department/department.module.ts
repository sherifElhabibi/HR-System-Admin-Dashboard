import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { CreateComponent } from './create/deparment.create.component';
import { ListComponent } from './list/deparment.list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ],
  exports:[
    ListComponent,
    CreateComponent,
    EditComponent
  ]
})
export class DepartmentModule { }
