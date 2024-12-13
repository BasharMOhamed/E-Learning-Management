import { Routes } from '@angular/router';
import { CourseManagementComponent } from '../Components/course-management/course-management.component';
import { AssessmentFormComponent } from '../Components/assessment-form/assessment-form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { UserProfileComponent } from '../Pages/user-profile/user-profile.component';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'Grades', component: StudentGradesComponent },
  { path: 'Courses', component: StudentCoursesComponent },
  { path: 'courseDetails/:id', component: CourseDetailsComponent },
  { path: 'Profile', component: UserProfileComponent },
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'assessment-form/:id', component: AssessmentFormComponent },
  { path: 'grading', component: GradingFormComponent },
  { path: 'Home', component: DashboardComponent },

  { path: 'accounts', component: AccountsComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
