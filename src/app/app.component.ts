import { Component, inject, OnInit } from '@angular/core';
// import { LoginComponent } from '../Pages';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Auth, getAuth } from '@angular/fire/auth';

import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { AccountsComponent } from './accounts/accounts.component';
import { routes } from './app.routes';
import { AssignStudentsComponent } from './assign-students/assign-students.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { CourseMaterialComponent } from '../Components/course-management/course-management.component';
import { child, Database, get, ref } from '@angular/fire/database';

import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    AssignStudentsComponent,
    CourseTableComponent,
    CourseMaterialComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  role: String = '';
  shouldShowNavbar: boolean = true;
  constructor(public auth: AuthService, private router: Router) {}
  LoggedIn!: boolean;

  firebaseAuth = inject(Auth);
  firebaseDatabase = inject(Database);

  ngOnInit() {
    // Call your function here
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.shouldShowNavbar =
          !this.router.url.includes('/auth') &&
          !this.router.url.includes('/register');
        this.getUserRole();
      });

    console.log(this.role);

    const user = getAuth().currentUser;
    if (user != null) {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
  }
  title = 'e-learning-project';

  getUserRole(): String {
    const userId = this.auth.userId;
    if (userId) {
      get(child(ref(this.firebaseDatabase), `/users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.role = snapshot.val().role;
          }
        })
        .catch((error) => console.log(error));
    }
    return '';
  }
}
