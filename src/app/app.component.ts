import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FirebaseAppModule } from '@angular/fire/app';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    SignupComponent,
    FirebaseAppModule,
    NavBarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
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
  title = 'e-learning-project';
}
