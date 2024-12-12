import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StudentCoursesComponent } from '../Pages/student-courses/student-courses.component';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { StudentGradesComponent } from '../Pages/student-grades/student-grades.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    SignupComponent,
    // FirebaseAppModule,
    NavBarComponent,
    StudentCoursesComponent,
    RouterModule,
    CourseDetailsComponent,
    StudentGradesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
