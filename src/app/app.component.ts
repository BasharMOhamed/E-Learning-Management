import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { getAuth } from '@angular/fire/auth';

import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { AccountsComponent } from './accounts/accounts.component';
import { routes } from './app.routes';
//import { CourseCardComponent } from '../Components/course-card/course-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FirebaseAppModule,
    ToastrModule,
    NavBarComponent,
    RouterModule,
    DashboardComponent,
    GradingFormComponent,
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
