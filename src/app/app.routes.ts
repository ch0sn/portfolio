import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then((module) => module.Projects),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((module) => module.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((module) => module.Contact),
  },
  {
    path: 'privat/anmelden',
    loadComponent: () => import('./pages/private/login/login').then((module) => module.PrivateLogin),
  },
  {
    path: 'privat',
    loadComponent: () => import('./pages/private/private-shell/private-shell').then((module) => module.PrivateShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/private/feed/feed').then((module) => module.PrivateFeed),
      },
      {
        path: 'ueber-mich',
        loadComponent: () => import('./pages/private/about/about').then((module) => module.PrivateAbout),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/private/blog-list/blog-list').then((module) => module.PrivateBlogList),
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./pages/private/blog-post/blog-post').then((module) => module.PrivateBlogPost),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((module) => module.NotFound),
  },
];
