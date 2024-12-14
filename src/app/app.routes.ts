import { Routes, CanActivate } from '@angular/router';
import { CourseMaterialComponent } from '../Components/course-management/course-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AssessmentFormComponent } from '../Components/assessment-form/assessment-form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { AssignStudentsComponent } from './assign-students/assign-students.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {
    path: 'Grades',
    component: StudentGradesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Courses',
    component: StudentCoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courseDetails/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assign-students',
    component: AssignStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-table',
    component: CourseTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: CourseManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-management',
    component: CourseMaterialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assessment-form/:id',
    component: AssessmentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'grading',
    component: GradingFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'Home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
