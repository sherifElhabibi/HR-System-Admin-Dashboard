import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '../shared/material.module'
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';




@NgModule({
  declarations: [
    ListComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports:[
    ListComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProjectModule { }
