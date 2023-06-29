import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    EmployeeProfileRoutingModule,
    HttpClientModule
  ],
  exports:[
    ProfileComponent
  ],
  providers: [DatePipe]

})
export class EmployeeProfileModule { }
