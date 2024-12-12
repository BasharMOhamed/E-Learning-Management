import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { StudentAssignmentsComponent } from '../Pages/student-assignments/student-assignments.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'Grades', component: StudentGradesComponent },
  { path: 'Couses', component: StudentCoursesComponent },
  { path: 'courseDetails/:id', component: CourseDetailsComponent },
  { path: 'Assignments', component: StudentAssignmentsComponent },
];
