import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import { CourseService } from '../course.service';
import { CourseManagementComponent } from '../course-management/course-management.component';
@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavBarComponent],
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
      isArchived: false
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
      isArchived: false
    },
  ];

  constructor(private router: Router,private courseService: CourseService) {
    this.courseService.courses$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  // Navigate for adding a new course
  navigateToCourseManagement() {
    this.router.navigate(['/course-management']);
  }

  // Navigate for editing an existing course
  editCourse(courseId: number) {
    this.router.navigate([`/edit/${courseId}`]);
  }

  // archiveCourse(course: any) {
  //   console.log('Archive course:', course);
  // }

  isArchived: boolean = false;

  archiveCourse(course: any) {
    course.isArchived = true; // Archive only the clicked row
  }

}
