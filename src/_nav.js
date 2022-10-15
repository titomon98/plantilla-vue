export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Tipos de Usuario (ejemplo)',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'CRUD',
    to: '/theme/crud',
    icon: 'cil-pencil',
    badge: {
      color: 'danger',
      text: 'IMPORTANTE',
    },
  },
]
