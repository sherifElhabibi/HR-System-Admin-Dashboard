import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  {
    name: 'Components',
    title: true
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
    iconComponent: { name: 'cil-building' },
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
      {
        name: 'Delete',
        url: '/department/delete/id'
      },
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
      // {
      //   name: 'Create',
      //   url: '/department/create'
      // },
    ]
  },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns'
  //     },
  //   ]
  // },
  //  {
  //   name: 'Employees',
  //   url: '/employees',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Create',
  //       url: '/employees/create'
  //     },
  //     {
  //       name: 'List',
  //       url: '/employees/list'
  //     },
  //   ]
  // },
  // {
  //   name: 'Department',
  //   url: '/department',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'List',
  //       url: '/department/list'
  //     },
  //     {
  //       name: 'Create',
  //       url: '/department/create'
  //     },
  //     {
  //       name: 'Edit',
  //       url: '/department/edit/id'
  //     },
  //   ]
  // },
  // {
  //   name: 'Project',
  //   url: '/project',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'List',
  //       url: '/project/'
  //     },
  //     {
  //       name: 'Create',
  //       url: '/project/add'
  //     },
  //     // {
  //     //   name: 'Create',
  //     //   url: '/department/create'
  //     // },
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
