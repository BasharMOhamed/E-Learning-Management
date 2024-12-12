import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { CourseCardComponent } from '../Components/course-card/course-card.component';
import { CourseManagementComponent } from "../Components/course-management/course-management.component";
import { RouterModule } from '@angular/router';
import { AssessmentFormComponent } from "../Components/assessment-form/assessment-form.component";
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CourseCardComponent, CourseManagementComponent, RouterModule, AssessmentFormComponent,ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
