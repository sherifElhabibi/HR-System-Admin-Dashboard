import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/deparment.create.component';
import { ListComponent } from './list/deparment.list.component';
import { EditComponent } from './edit/edit.component';


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
        data: {
          title: 'List',
        },
      },
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create',
        },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }