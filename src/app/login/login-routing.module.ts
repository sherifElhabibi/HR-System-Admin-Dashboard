import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginnComponent } from './component/login.component';

const routes: Routes = [
  { path: '', component: LoginnComponent },
  { path: 'login', component: LoginnComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
