import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'layout/login',
    pathMatch: 'full'
  },
  {
    path: 'layout',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/components/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () => import('./modules/auth/components/signup/signup').then((m) => m.Signup),
      },
    ]
  },

  // ❌ Wildcard
  {
    path: '**',
    redirectTo: 'login',
  },
];
