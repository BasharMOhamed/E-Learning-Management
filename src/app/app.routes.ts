import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'logout', redirectTo: 'auth' },
  { path: 'home', component: HomeComponent },
  // { path: 'Dashboard' },
  // { path: 'courses' },
  // { path: 'grades' },
];
