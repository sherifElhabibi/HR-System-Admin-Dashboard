import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptorService } from './token-interceptor/token.interceptor.service';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,

  
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { DepartmentModule } from './department/department.module';
import { ProjectModule } from './project/project.module';
import { ProjectTaskModule } from './project-task/project-task.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MaterialModule } from './shared/material.module';


const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    DepartmentModule,
    ProjectModule,
    ProjectTaskModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EmployeeProfileModule,
    AttendanceModule,
    MaterialModule,
    
        
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
        {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    IconSetService,
    Title,DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
