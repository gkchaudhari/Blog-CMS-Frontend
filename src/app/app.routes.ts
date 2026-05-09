import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';

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
        canActivate: [authGuard],
        loadComponent: () =>
          import('./modules/dashboard/dashboard')
            .then(m => m.Dashboard),
      },
      {
        path: 'blog/create',
        loadComponent: () => import('./modules/blog/edit-blog/edit-blog').then(m => m.EditBlog),
      },
      {
        path: 'blog/edit/:id/:slug',
        loadComponent: () => import('./modules/blog/edit-blog/edit-blog').then(m => m.EditBlog),
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];