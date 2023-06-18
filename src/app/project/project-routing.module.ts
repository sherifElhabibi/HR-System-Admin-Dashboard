import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component'
import { AddProjectComponent } from './add-project/add-project.component'
import { EditProjectComponent } from './edit-project/edit-project.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: 'edit/:id', component: EditProjectComponent},
  { path: 'add', component: AddProjectComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
