import { Routes } from '@angular/router';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { CourseCardComponent } from '../Components/course-card/course-card.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'grading', component: GradingFormComponent },
  { path: 'Home', component: DashboardComponent },
];
