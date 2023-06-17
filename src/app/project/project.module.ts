import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatCardModule
  ],
  exports:[
    ListComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProjectModule { }
