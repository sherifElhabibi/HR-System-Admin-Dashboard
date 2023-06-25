import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/deparment.create.component';
import { ListComponent } from './list/deparment.list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AuthGuard } from '../models/Login/authGuard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Department',
    },
    children: [
      {
        path: 'list',
        component: ListComponent,
       /* canActivate:[AuthGuard],
        data: {
          title: 'List',
          Position: ['Admin','HR','Accountant']
        },*/
      },
      {
        path: 'create',
        component: CreateComponent,
       /* canActivate:[AuthGuard],
        data: {
          title: 'Create',
          Position: ['Admin']
        },*/
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      /*  canActivate:[AuthGuard],
        data: {
          title: 'Edit',
          Position: ['Admin']
        },*/
      },
      {
        path: 'delete/:id',
        component: DeleteComponent,
       /* canActivate:[AuthGuard],
        data: {
          title: 'Delete',
          Position: ['Admin']
        },*/
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }