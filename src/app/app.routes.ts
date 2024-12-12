import { Routes } from '@angular/router';
import { CourseManagementComponent } from '../Components/course-management/course-management.component';
import { AssessmentFormComponent } from '../Components/assessment-form/assessment-form.component';


export const routes: Routes = [{ path: 'course-management', component: CourseManagementComponent },
    { path: 'assessment-form', component: AssessmentFormComponent }
];
