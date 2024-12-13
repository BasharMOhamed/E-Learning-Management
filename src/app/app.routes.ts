import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseTableComponent } from './course-table/course-table.component';
export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  // { path: 'course-management', component:CourseManagementComponent },
  // { path: 'course-management/:id', component: CourseManagementComponent }, // Passing course ID as a parameter
  { path: '', component: CourseTableComponent }, // Default route
  { path: 'course-management', component: CourseManagementComponent }, // Course management route
];
