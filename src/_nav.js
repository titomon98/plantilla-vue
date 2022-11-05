export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'Arquitectura 1',
  },
  {
    component: 'CNavItem',
    name: 'Tipos de Usuario (ejemplo)',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Componente montado ',
    to: '/theme/montado',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Ventas',
    to: '/theme/Ventas',
    icon: 'cil-pencil',
    badge: {
      color: 'danger',
      text: 'IMPORTANTE',
    },
  },
]
