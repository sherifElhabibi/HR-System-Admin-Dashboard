import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'My Profile',
    url: '/employeeProfile',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Profile',
        url: '/employeeProfil/profile/id',
      },
    ],
  },
  {
    name: 'Projects',
    url: '/project',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'List',
        url: '/project/',
      },
      {
        name: 'Create',
        url: '/project/add',
      },
    ],
  },
  {
    name: 'Projects Phases',
    url: '/phases',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'List',
        url: '/phases/list',
      },
    ],
  },
  {
    name: 'Projects Tasks',
    url: '/projecttask',
    iconComponent: { name: 'cil-task' },
    children: [
      {
        name: 'List',
        url: '/projecttask/list',
      },
      {
        name: 'Create',
        url: '/projecttask/create',
      },
    ],
  },
  {
    name: 'Departments',
    url: '/department',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'List',
        url: '/department/list',
      },
      {
        name: 'Create',
        url: '/department/create',
      },
      {
        name: 'Edit',
        url: '/department/edit/id',
      },
    ],
  },
  {
    name: 'Employees',
    url: '/employees',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'List',
        url: '/employees/list',
      },
      {
        name: 'Create',
        url: '/employees/create',
      },
    ],
  },
  {
    name: 'Attendance',
    url: '/attendance',
    iconComponent: { name: 'cil-user' },
  }
];
