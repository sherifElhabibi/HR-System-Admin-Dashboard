import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhaseCreateComponent } from './create/phase.create.component';
import { PhaseEditComponent } from './edit/phase.edit.component';
import { PhaseListComponent } from './list/phase.list.component';
import { PhaseDetailsComponent } from './details/phase.details.component';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation.component';
import { CreateProjectPhase } from '../models/projectPhase/CreateProjectPhase';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Phases',
    },
    children: [
      {
        path: 'list',
        component: PhaseListComponent,
        data: {
          title: 'List',
        },
      },
    ],
  },
  // {path: 'list', component:PhaseListComponent},
  {path: 'add/:id', component:PhaseCreateComponent},
  {path: 'edit/:id', component:PhaseEditComponent},
  {path: 'details/:id', component:PhaseDetailsComponent},
  {path: 'delete/:id', component:DeleteConfirmationComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPhaseRoutingModule { }
