import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../app/course.service';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CourseCardComponent, CommonModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css',
})
export class CourseMaterialComponent {
  courses: any[] = [];
  constructor(
    private router: Router,
    private courseService: CourseService,
    private auth: AuthService
  ) {
    const instructorId = auth.userId;
    this.courseService.getCourseById(instructorId);
    this.courseService.instructorCourse$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  editCourse(course: any) {
    this.router.navigate(['/assessment-form', course.id]);
  }
}
