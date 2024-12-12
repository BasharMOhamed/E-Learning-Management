import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../Components/course-card/course-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, CourseCardComponent, RouterModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent {
  searchText: string = '';
  courses = [
    {
      id: 1,
      title: 'Human Computer Interaction',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 3,
    },
    {
      id: 2,
      title: 'Data Science',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 1.5,
    },
    {
      id: 3,
      title: 'Design Patterns',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 2,
    },
    {
      id: 4,
      title: 'Cyber Security',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 1.5,
    },
    {
      id: 5,
      title: 'Mobile Computing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 3,
    },
    {
      id: 6,
      title: 'Data Mining',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 3,
    },
    {
      id: 7,
      title: 'High Performance Computing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor.',
      instructor: 'Mr. Smith',
      hours: 3,
    },
  ];
  filteredCourses = this.courses;

  searchCourses(title: String): void {
    console.log(title);

    this.filteredCourses = this.courses.filter((course) =>
      course.title.toLowerCase().includes(title.trim().toLowerCase())
    );
  }
}
