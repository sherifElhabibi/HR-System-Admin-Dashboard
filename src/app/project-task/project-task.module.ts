import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTaskRoutingModule } from './project-task-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '../shared/material.module';
import { ProjecttaskService } from '../services/projecttask.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 //import{FormModule} from '@coreui/angular';

@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DetailsComponent
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
