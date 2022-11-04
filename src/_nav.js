export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'Arquitectura I',
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
    icon: 'cil-user',
    badge: {
      color: 'danger',
      text: 'IMPORTANTE',
    },
  },
  {
    component: 'CNavItem',
    name: 'COMPRAS',
    to: '/theme/crud1', //ruta para apuntar al componente
    icon: 'cil-basket',
    badge: {
      color: 'success',
      text: 'Comprar',
    },
  },
  {
    component: 'CNavItem',
    name: 'Montado',
    to: '/theme/montado', //ruta para apuntar al componente
    icon: 'cil-people',
    badge: {
      color: 'info',
      text: 'MONTAJE',
    },
  },
]
