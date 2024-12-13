import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent {
  courses = [
    {
      id: 1, // Added id for routing
      name: 'Course 1',
      hours: 3,
      instructor: 'Instructor1',
      status: 'Active',
      grades: {
        theoretical: 0.0,
        practical: 0.0,
        yearwork: 0.0,
        midterm: 0.0,
        quizzes: 0.0,
      },
    },
    {
      id: 2, // Added id for routing
      name: 'Course 2',
      hours: 3,
      instructor: 'Instructor2',
      status: 'Active',
      grades: {
        theoretical: 0.0,
        practical: 0.0,
        yearwork: 0.0,
        midterm: 0.0,
        quizzes: 0.0,
      },
    },
  ];

  constructor(private router: Router) {}

  // Navigate for adding a new course
  navigateToCourseManagement() {
    this.router.navigate(['/app-course-management']);
  }

  // Navigate for editing an existing course
  editCourse(course: any) {
    this.router.navigate(['/course-management'], {
      queryParams: { mode: 'edit', id: course.id },
    });
  }

  archiveCourse(course: any) {
    console.log('Archive course:', course);
  }
}
