import { INavData } from '@coreui/angular';


  export const navItems: INavData[] = [

    {
      name: 'Components',
      title: true
    },
    {
      name: 'My Profile',
      url: '/employeeProfile',
      iconComponent: { name: 'cil-user' },
      children: [
        {
          name: 'Profile',
          url: '/employeeProfil/profile/id'
        },
      ]
    },
    {
      name: 'Employees',
      url: '/employees',
      iconComponent: { name: 'cil-user' },
      children: [
        {
          name: 'List',
          url: '/employees/list'
        },
        {
          name: 'Create',
          url: '/employees/create'
        },
      ]
    },
    {
      name: 'Departments',
      url: '/department',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'List',
          url: '/department/list'
        },
        {
          name: 'Create',
          url: '/department/create'
        },
        {
          name: 'Edit',
          url: '/department/edit/id'
        },
        // {
        //   name: 'Delete',
        //   url: '/department/delete/id'
        // },
      ]
    },
    {
      name: 'Projects Tasks',
      url: '/projecttask',
      iconComponent: { name: 'cil-task' },
      children: [
        {
          name: 'List',
          url: '/projecttask/list'
        },
        {
          name: 'Create',
          url: '/projecttask/create'
        },
      ]
    },
    {
      name: 'Projects Phases',
      url: '/phases',
      iconComponent: { name: 'cil-cursor' },
      children: [
        {
          name: 'List',
          url: '/phases/list'
        },
      ]
    },
    {
      name: 'Projects',
      url: '/project',
      iconComponent: { name: 'cil-star' },
      children: [
        {
          name: 'List',
          url: '/project/'
        },
        {
          name: 'Create',
          url: '/project/add'
        }
      ]
    },
    {
      name: 'Account',
      url: '/login',
      iconComponent: { name: 'cil-star' },
      children: [
        {
          name: 'Login',
          url: '/login',
        },
        // {
        //   name: 'Register',
        //   url: '/register'
        // },
        // {
        //   name: 'Error 404',
        //   url: '/404'
        // },
        // {
        //   name: 'Error 500',
        //   url: '/500'
        // }
      ]
    },

  ];
