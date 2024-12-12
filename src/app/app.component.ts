import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { getAuth } from '@angular/fire/auth';
=======
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
<<<<<<< HEAD
>>>>>>> 4ae4afb (add navbar component)
=======
import { CourseCardComponent } from '../Components/course-card/course-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CourseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
<<<<<<< HEAD
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}
  LoggedIn!: boolean;

  ngOnInit() {
    const user = getAuth().currentUser;
    if (user != null) {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
  }
=======
export class AppComponent {
>>>>>>> 4ef7da3 (firebase installation)
  title = 'e-learning-project';
}
