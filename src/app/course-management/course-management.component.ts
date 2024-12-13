import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DropdownMenuComponent } from "../dropdown-menu/dropdown-menu.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownMenuComponent,RouterModule],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  myForm: FormGroup;
  mode: string | null = null; // 'add' or 'edit'
  courseId: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.myForm = this.fb.group({
      courseName: ['', Validators.required],
      courseHours: ['', Validators.required],
      status: ['', Validators.required],
      instructorName: ['', Validators.required], // Now binds to dropdown
      studentGrades: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     this.mode = params['mode'];
  //     this.courseId = params['id']; // Only present for edit
  //     console.log('Mode:', this.mode, 'Course ID:', this.courseId);
  //   });
  // }
  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((values) => {
      console.log('Form Values:', values);
      console.log('Form Valid:', this.myForm.valid);
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
      this.myForm.markAllAsTouched();
    }
  }
}
