export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'Arquitectuar 1',
  },
  {
    component: 'CNavItem',
    name: 'Tipos de Usuario (ejemplo)',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Montado',
    to: '/theme/montado',
    icon: 'cil-user',
    badge: {
      color: 'warning',
      text: 'Montado',
    },
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
  {
    component: 'CNavItem',
    name: 'Clientes',
    to: '/theme/clientes',
    icon: 'cil-pencil',
    badge: {
      color: 'danger',
      text: 'Clientes',
    },
  },
  {
    component: 'CNavItem',
    name: 'Proveedores',
    to: '/theme/proveedores',
    icon: 'cil-pencil',
    badge: {
      color: 'danger',
      text: 'Proveedores',
    },
  },
]
