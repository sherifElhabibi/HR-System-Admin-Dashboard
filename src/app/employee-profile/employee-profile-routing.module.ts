import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'EmployeeProfil',
    },
    children: [
      {
        path: 'profile/:id',
        component: ProfileComponent,
        title:'Profile',
      },
 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule { }
