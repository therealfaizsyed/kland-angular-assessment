// app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Account } from './account/account';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { 
    path: 'account', 
    component: Account,
    // Add canActivate guard here to protect the route
    // canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];