import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { LoginnComponent } from './component/login.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    LoginnComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class LoginModule { }
