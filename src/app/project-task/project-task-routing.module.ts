import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { CreatewithprojidComponent } from './createwithprojid/createwithprojid.component';

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
        data: {
          title: 'Create',
        },
      },
      {
        path: 'createid',
        component: CreatewithprojidComponent,
        data: {
          title: 'Createid',
        },
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'List',
        },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit',
        },
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        data: {
          title: 'Details',
        },
      },
 
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTaskRoutingModule { }
