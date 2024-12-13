import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule],
})
export class DashboardComponent {
  courses = [
    'All Students',
    'Human Computer Interaction',
    'Web Development',
    'Data Science',
  ];

  students = [
    { id: 'Student 1', progress: 5, course: 'Human Computer Interaction' },
    { id: 'Student 2', progress: 15, course: 'Human Computer Interaction' },
    { id: 'Student 3', progress: 100, course: 'Web Development' },
    { id: 'Student 4', progress: 50, course: 'Data Science' },
    // Add more student data
  ];

  filteredStudents = this.students; // Initially show all students
  selectedCourse = 'All Students'; // Default selection

  filterByCourse() {
    if (this.selectedCourse === 'All Students') {
      // Show all students if "All Students" is selected
      this.filteredStudents = this.students;
    } else {
      // Filter based on the selected course
      this.filteredStudents = this.students.filter(
        (student) => student.course === this.selectedCourse
      );
    }
  }
}
