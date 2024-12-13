import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { Router } from '@angular/router';
import { getDatabase, get, ref, child } from '@angular/fire/database';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, AssessmentFormComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css',
})
export class CourseManagementComponent {
  dbRef = ref(getDatabase());
  courses: any[] = [];
  constructor(private router: Router) {
    get(child(this.dbRef, `/courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.courses = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            hours: snapshot.val()[key].hours.toString(),
            title: snapshot.val()[key].name,
            author: snapshot.val()[key].instructor,
            description: snapshot.val()[key].description,
            editable: true,
          }));

          console.log(this.courses);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  editCourse(course: any) {
    this.router.navigate(['/assessment-form', course.id]);
  }
}
