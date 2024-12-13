import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseManagementComponent } from '../course-management/course-management.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getDatabase, ref, child, push, update } from '@angular/fire/database';

@Component({
  selector: 'app-assessment-form',
  standalone: true,
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css'],
  imports: [CommonModule, CourseManagementComponent, ReactiveFormsModule],
})
export class AssessmentFormComponent implements OnInit {
  dbRef = ref(getDatabase());
  assessmentForm: FormGroup;
  courseId: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) {
    this.assessmentForm = this.fb.group({
      assessment: [''],
      assessmentFile: [''],
      startDate: [''],
      endDate: [''],
      material: ['', Validators.required],
      materialFile: ['', Validators.required],
      materialDescription: ['', Validators.required],
      assessmentDescription: [''],
      materialType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.courseId = params['id'];
    });
  }
  navigateToCourses() {
    this.router.navigate(['/course-management']);
  }

  uploadMaterial(materialType: String) {
    const {
      material,
      materialDescription,
      assessment,
      assessementDescription,
      endDate,
    } = this.assessmentForm.value;
    const newMaterialKey = push(
      child(this.dbRef, `courses/${this.courseId}/${materialType}`)
    ).key;
    const updates: { [key: string]: any } = {};
    if (assessment.length != 0) {
      updates[
        '/courses/' + this.courseId + '/' + materialType + '/' + newMaterialKey
      ] = {
        title: assessment,
        desription: assessementDescription,
        deadLine: endDate,
      };
    }
    updates[
      '/courses/' + this.courseId + '/' + materialType + '/' + newMaterialKey
    ] = {
      title: material,
      desription: materialDescription,
    };

    update(this.dbRef, updates);
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      this.toastr.success('Form submitted successfully', 'success');
      const { materialType } = this.assessmentForm.value;
      switch (materialType.toLowerCase()) {
        case 'lecture':
          this.uploadMaterial('Lectures');
          break;
        case 'book':
          this.uploadMaterial('Books');
          break;
        case 'media':
          this.uploadMaterial('MultiMedia');
          break;
        default:
          this.toastr.error('Invalid material type');
          break;
      }
      this.navigateToCourses();
    } else {
      this.assessmentForm.markAllAsTouched();
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
}
