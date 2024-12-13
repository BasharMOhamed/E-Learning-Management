import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { AssignStudentsComponent } from "./assign-students/assign-students.component";
import { CourseManagementComponent } from "./course-management/course-management.component";
import { CourseTableComponent } from "./course-table/course-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    SignupComponent,
    FirebaseAppModule,
    AssignStudentsComponent,
    CourseManagementComponent,
    CourseTableComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
