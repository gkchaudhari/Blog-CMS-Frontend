import { Routes } from '@angular/router';

export const BlogRoutes: Routes = [
    {
        path: 'create',
        loadComponent: () => import('./edit-blog/edit-blog').then(m => m.EditBlog),
    },
    {
        path: 'edit/:blogId/:slug',
        loadComponent: () => import('./edit-blog/edit-blog').then(m => m.EditBlog),
    }
]