import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component'
import { AddProjectComponent } from './add-project/add-project.component'
import { EditProjectComponent } from './edit-project/edit-project.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'
import { AuthGuard } from '../models/Login/authGuard';

const routes: Routes = [
  { path: '', component: ListComponent,/*canActivate: [AuthGuard] ,data: { Postion: ['Accountant', 'Admin'] }*/},
  { path: 'details/:id', component: ProjectDetailsComponent, /*canActivate: [AuthGuard], data: { Postion: ['Accountant', 'Admin'] } */},
  { path: 'edit/:id', component: EditProjectComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] } */},
  { path: 'add', component: AddProjectComponent, /*canActivate: [AuthGuard], data: { Postion: ['Admin'] } */},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
