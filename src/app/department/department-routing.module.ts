import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/deparment.create.component';
import { ListComponent } from './list/deparment.list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
var routes:Routes;
if(true){ routes = [
  {
    path: '',
    data: {
      title: 'Department',
    },
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'delete/:id',
        component: DeleteComponent,
      },
    ],
  },
];
}


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }