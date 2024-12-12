import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseManagementComponent } from '../course-management/course-management.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-assessment-form',
  standalone: true,
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css'],
  imports:[CommonModule,CourseManagementComponent],
})
export class AssessmentFormComponent {

  
  assessmentForm: FormGroup;
  assessment: any;
  assesmentFile: any;
  startDate: any;
  endDate: any;
  matrial: any;
  matrialFile: any;
  

  constructor(private fb: FormBuilder,private router :Router,private toastr :ToastrService) {

    this.assessmentForm = this.fb.group({
      assessment: ['', Validators.required],
      assessmentFile: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      material: ['', Validators.required],
      materialFile: ['', Validators.required],
    });
  }
  navigateToCourseForm() {
    this.router.navigate(['/course-management']);
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      console.log('Form Submitted:', this.assessmentForm.value);
    } else {
      this.assessmentForm.markAllAsTouched();
      console.error('Form is invalid!');
    }
  }
  submitForm() {
    if (this.assessment && this.assesmentFile && this.startDate && this.endDate&&this.matrial&&this.matrialFile) {
      this.toastr.success('Form submitted successfully', 'success');
    } else {
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
  
}
