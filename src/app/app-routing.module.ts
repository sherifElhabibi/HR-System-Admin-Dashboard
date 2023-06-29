import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginnComponent  } from './login/component/login.component';
import { AttendanceComponent } from './attendance/attendance.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginnComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule)
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'employeeProfil',
        loadChildren: () =>
          import('./employee-profile/employee-profile.module').then((m) => m.EmployeeProfileModule)
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./department/department.module').then((m) => m.DepartmentModule)
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./project/project.module').then((m) => m.ProjectModule)
      },
      {
        path: 'phases',
        loadChildren: () =>
          import('./project-phase/project.phase.module').then((m) => m.ProjectPhaseModule)
      },
      {
        path: 'projecttask',
        loadChildren: () =>
          import('./project-task/project-task.module').then((m) => m.ProjectTaskModule)
      },
      { path: 'attendance', component: AttendanceComponent },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
