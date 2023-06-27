import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AttendanceModule { }
