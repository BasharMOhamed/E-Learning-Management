// grading-form.component.ts
// grading-form.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grading-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css'],
})
export class GradingFormComponent {
  studentID = '';
  courseID = '';
  assessment = '';
  grade = '';

  constructor(private toastr: ToastrService) {}

  submitForm() {
    if (this.studentID && this.courseID && this.assessment && this.grade) {
      this.toastr.success('Form submitted successfully', 'success');
    } else {
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
}
