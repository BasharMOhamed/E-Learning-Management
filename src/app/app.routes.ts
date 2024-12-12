import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
