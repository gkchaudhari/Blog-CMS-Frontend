import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./modules/auth/components/login/login').then(m => m.Login),
      },
      {
        path: 'signup',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./modules/auth/components/signup/signup').then(m => m.Signup),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard')
            .then(m => m.Dashboard),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];