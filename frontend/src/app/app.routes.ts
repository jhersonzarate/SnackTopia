import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home/home').then(m => m.HomeComponent)
  },

  // Ofertas
  {
    path: 'ofertas',
    loadComponent: () =>
      import('./features/ofertas/ofertas/ofertas').then(m => m.OfertasComponent)
  },

  // Productos
  {
    path: 'productos',
    loadComponent: () =>
      import('./features/productos/lista-productos/lista-productos').then(m => m.ListaProductosComponent)
  },
  {
    path: 'productos/:id',
    loadComponent: () =>
      import('./features/productos/detalle-producto/detalle-producto').then(m => m.DetalleProductoComponent)
  },

  // Auth
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'auth/registro',
    loadComponent: () =>
      import('./features/auth/registro/registro').then(m => m.RegistroComponent)
  },
  {
    path: 'auth/restablecer',
    loadComponent: () =>
      import('./features/auth/restablecer/restablecer').then(m => m.RestablecerComponent)
  },

  // Checkout (protegido)
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout/checkout').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },

  // Nosotros
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/nosotros/nosotros/nosotros').then(m => m.NosotrosComponent)
  },

  // Contacto
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contacto/contacto/contacto').then(m => m.ContactoComponent)
  },

  // Libro de reclamaciones
  {
    path: 'libro-reclamaciones',
    loadComponent: () =>
      import('./features/libro-reclamaciones/libro-reclamaciones/libro-reclamaciones').then(m => m.LibroReclamacionesComponent)
  },

  // Wildcard
  { path: '**', redirectTo: '' }
];