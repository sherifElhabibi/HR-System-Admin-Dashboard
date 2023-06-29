import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProjectTaskRoutingModule } from './project-task-routing.module';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

import { CreatewithprojidComponent } from './createwithprojid/createwithprojid.component';
import { ProjecttaskService } from '../services/projecttask.service';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DetailsComponent,
    ListComponent,
    CreatewithprojidComponent
  ],
  imports: [
    CommonModule,
    ProjectTaskRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule

  
    
  ],
  // exports:[
  // CreateComponent,
  // DetailsComponent,
  // EditComponent
  // ],
  providers: [ProjecttaskService]

})
export class ProjectTaskModule { }
