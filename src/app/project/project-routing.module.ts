import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ListComponent} from './list/list.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project',
    },
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'List',
        },
      },
      // {
      //   path: 'create',
      //   component: CreateComponent,
      //   data: {
      //     title: 'Create',
      //   },
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
