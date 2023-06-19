import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTaskRoutingModule } from './project-task-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectTaskRoutingModule
  ]
})
export class ProjectTaskModule { }
