import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectPhaseRoutingModule } from './project.phase-routing.module';
import { PhaseCreateComponent } from './create/phase.create.component';
import { PhaseEditComponent } from './edit/phase.edit.component';
import { PhaseListComponent } from './list/phase.list.component';
import { PhaseDetailsComponent } from './details/phase.details.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhaseCreateComponent,
    PhaseEditComponent,
    PhaseListComponent,
    PhaseDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProjectPhaseRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProjectPhaseModule { }
