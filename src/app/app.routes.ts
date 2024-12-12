import { Routes } from '@angular/router';
import { GradingFormComponent } from './grading/grading.component';
import { CourseCardComponent } from '../Components/course-card/course-card.component';

export const routes: Routes = [
  { path: 'grading', component: GradingFormComponent },
];
