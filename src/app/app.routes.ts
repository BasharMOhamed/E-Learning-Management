import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { UserProfileComponent } from '../Pages/user-profile/user-profile.component';
import { AssessmentFormComponent } from '../Components/assessment-form/assessment-form.component';
import { CourseManagementComponent } from '../Components/course-management/course-management.component';
import { CourseTableComponent } from './course-table/course-table.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'Grades', component: StudentGradesComponent },
  { path: 'Courses', component: StudentCoursesComponent },
  { path: 'courseDetails/:id', component: CourseDetailsComponent },
  { path: 'Profile', component: UserProfileComponent },
  { path: '/course-table', component: CourseTableComponent },
  { path: 'edit/:id', component: CourseManagementComponent },
  { path: 'assessment-form', component: AssessmentFormComponent },
  { path: 'course-management', component: CourseManagementComponent },
];
