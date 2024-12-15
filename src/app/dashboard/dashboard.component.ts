import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
//   standalone: true, // Enables standalone components
//   imports: [CommonModule], // Import the HomeComponent here
// })
// export class DashboardComponent {
//   Completed: any[] = [];

// }import { Component, OnInit } from '@angular/core';

interface Student {
  id: string;
  name: string;
  progress: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  totalStudents: number = 0;
  inProgress: number = 0;
  completed: number = 0;

  ngOnInit() {
    // Mock Data - Replace this with actual API call
    this.students = [
      { id: '1', name: 'Student 1', progress: 5 },
      { id: '2', name: 'Student 2', progress: 15 },
      { id: '3', name: 'Student 3', progress: 10 },
      { id: '4', name: 'Student 4', progress: 100 },
      { id: '5', name: 'Student 5', progress: 50 },
    ];

    this.totalStudents = this.students.length;
    this.inProgress = this.students.filter((s) => s.progress < 100).length;
    this.completed = this.students.filter((s) => s.progress === 100).length;
  }
}

