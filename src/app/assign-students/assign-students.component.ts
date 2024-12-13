import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-assign-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Add CommonModule to imports array
  templateUrl: './assign-students.component.html',
  styleUrls: ['./assign-students.component.css']
})
export class AssignStudentsComponent {
  myForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      courseName: ['', Validators.required],
      courseId: ['', Validators.required],
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      studentLevel: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.myForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  onSubmit(): void {

    if (this.myForm.valid) {
      console.log('Form Submitted!', this.myForm.value);
      alert('Form submitted successfully!');
    } else {
      this.myForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
}
