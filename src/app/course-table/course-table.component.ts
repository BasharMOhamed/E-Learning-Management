import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent {
  courses: any[] = [];

  constructor(private router: Router, private courseService: CourseService) {
    courseService.getAllCourses();
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  // Navigate for adding a new course
  navigateToCourseManagement() {
    this.router.navigate(['edit']);
  }

  // Navigate for editing an existing course
  editCourse(courseId: String) {
    this.router.navigate(['edit'], { queryParams: { id: courseId } });
  }

  isArchived: boolean = false;

  archiveCourse(course: any) {
    course.isArchived = !course.isArchived;
    this.courseService.toggleArchive(course.id, course.isArchived);
  }
}
