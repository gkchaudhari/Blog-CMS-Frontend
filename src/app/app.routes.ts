import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../modules/auth/components/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('../modules/auth/components/signup/signup').then((m) => m.Signup),
  },
  {
    path: '',
    loadComponent: () => import('../layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      // default route after login
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // ❌ Wildcard
  {
    path: '**',
    redirectTo: 'login',
  },
];
