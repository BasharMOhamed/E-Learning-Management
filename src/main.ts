import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideRouter, Routes} from '@angular/router';
import { CourseManagementComponent } from './app/course-management/course-management.component';
// import { routes } from './app/app.routes';
import { CourseTableComponent } from './app/course-table/course-table.component';
import { AssignStudentsComponent } from './app/assign-students/assign-students.component';


const routes: Routes = [
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'course-table', component: CourseTableComponent },
  { path: 'assign-students', component: AssignStudentsComponent },
  { path: '', redirectTo: 'course-table', pathMatch: 'full' }, // Default route
  { path: 'edit/:id', component: CourseManagementComponent },
];


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});

