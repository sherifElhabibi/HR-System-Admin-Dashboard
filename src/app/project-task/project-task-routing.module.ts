import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { CreatewithprojidComponent } from './createwithprojid/createwithprojid.component';
import { AuthGuard } from '../models/Login/authGuard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projecttask',
    },
    children: [
      {
        path: 'create',
        component: CreateComponent,
        /*canActivate:[AuthGuard],
        data: {
          title: 'Create',
          Position:['Admin']
        },*/
      },
      {
        path: 'createid',
        component: CreatewithprojidComponent,
        /*canActivate:[AuthGuard],
        data: {
          title: 'Createid',
          Position:['Admin','Accountant']
        },*/
      },
      {
        path: 'list',
        component: ListComponent,
       /* canActivate:[AuthGuard],
        data: {
          title: 'List',
          Position:['Admin','Accountant']
        },*/
      },
      {
        path: 'edit/:id',
        component: EditComponent,
       /* canActivate:[AuthGuard],
        data: {
          title: 'Edit',
          Position:['Admin','Accountant']
        },*/
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        /*canActivate:[AuthGuard],
        data: {
          title: 'Details',
          Position:['Admin','Accountant']
        },*/
      },
 
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTaskRoutingModule { }
