import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CourseCardComponent,CommonModule,AssessmentFormComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  constructor(private router: Router) {}
  navigateToAssessmentForm() {
    this.router.navigate(['/assessment-form']);
  }
  courses = [
    {
      title: 'Human Computer Interaction',
      description: 'Explore the design of interactive systems.',
      duration: '3 Months',
      author: 'Nivin Atef',
      image: 'assets/hci.jpg',
      editable: true,
    },
    {
      title: 'Database and Management Systems',
      description: 'Learn about modern database management.',
      duration: '3 Months',
      author: 'Nivin Atef',
      image: 'assets/dbms.jpg',
      editable: true,
    },
    {
      title: 'Social Media Analytics',
      description: 'Analyze data from social platforms.',
      duration: '3 Months',
      author: 'Nivin Atef',
      image: 'assets/sma.jpg',
      editable: true,
    },
  ];

  editCourse(course: any) {
   // alert(`Editing course: ${course.title}`);
    this.navigateToAssessmentForm();
    
  }
}


