import { Routes } from '@angular/router';
import { HardcodedAuthGuard } from './auth/hardcoded-auth.guard';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'portfolio/list', pathMatch: 'full' },

  // Portfolio feature routes
  {
    path: 'portfolio',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      {
        path: 'list',
        loadComponent: () =>
          import(
            './portfolio/components/portfolio-list/portfolio-list.component'
          ).then((m) => m.PortfolioListComponent),
        canActivate: [HardcodedAuthGuard],
      },

      {
        path: 'add',
        loadComponent: () =>
          import(
            './portfolio/components/add-holding/add-holding.component'
          ).then((m) => m.AddHoldingComponent),
        canActivate: [HardcodedAuthGuard],
      },

      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './portfolio/components/edit-holding/edit-holding.component'
          ).then((m) => m.EditHoldingComponent),
        canActivate: [HardcodedAuthGuard],
      },
    ],
  },

  // Optional authentication route (example)
  // {
  //   path: 'signin',
  //   loadComponent: () =>
  //     import('./auth/signin.component')
  //       .then((m) => m.SigninComponent)
  //       .catch(() => null),
  // },

  // Wildcard fallback
  { path: '**', redirectTo: 'portfolio/list' },
];
