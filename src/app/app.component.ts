import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';

import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';

import { AssignStudentsComponent } from './assign-students/assign-students.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseTableComponent } from './course-table/course-table.component';

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
    NavBarComponent,
    RouterModule,
    DashboardComponent,
    GradingFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
