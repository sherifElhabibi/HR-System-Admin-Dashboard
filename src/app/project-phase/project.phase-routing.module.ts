import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhaseCreateComponent } from './create/phase.create.component';
import { PhaseEditComponent } from './edit/phase.edit.component';
import { PhaseListComponent } from './list/phase.list.component';
import { PhaseDetailsComponent } from './details/phase.details.component';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation.component';
import { CreateProjectPhase } from '../models/projectPhase/CreateProjectPhase';
import { AuthGuard } from '../models/Login/authGuard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Phases',
    },
    children: [
      { path: 'list', component: PhaseListComponent,/*canActivate: [AuthGuard],data:{ Postion: ['Accountant', 'Admin'] }*/},
    ],
  },
  { path: 'add/:id', component: PhaseCreateComponent,/* canActivate: [AuthGuard] ,data:{ Postion: ['Admin'] }*/},
  { path: 'edit/:id', component: PhaseEditComponent, /*canActivate: [AuthGuard] ,data:{ Postion: ['Admin'] }*/},
  { path: 'details/:id', component: PhaseDetailsComponent,/* canActivate: [AuthGuard],data:{ Postion: ['Admin,Accountant'] }*/ },
  { path: 'delete/:id', component: DeleteConfirmationComponent, /*canActivate: [AuthGuard],data:{ Postion: ['Admin'] } */},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPhaseRoutingModule { }
