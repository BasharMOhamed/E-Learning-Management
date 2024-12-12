import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';
import { UserProfileComponent } from '../Pages/user-profile/user-profile.component';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { CourseCardComponent } from '../Components/course-card/course-card.component';
import { CourseManagementComponent } from '../Components/course-management/course-management.component';
import { AssessmentFormComponent } from '../Components/assessment-form/assessment-form.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FirebaseAppModule,
    NavBarComponent,
    RouterModule,
    UserProfileComponent,
    CourseDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
