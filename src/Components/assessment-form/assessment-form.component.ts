import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  set,
  get,
} from '@angular/fire/database';

@Component({
  selector: 'app-assessment-form',
  standalone: true,
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AssessmentFormComponent implements OnInit {
  dbRef = ref(getDatabase());
  assessmentForm: FormGroup;
  courseId: any;
  students: any[] = [];
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
      assessmentDescription,
      endDate,
    } = this.assessmentForm.value;
    const newMaterialKey = push(
      child(this.dbRef, `courses/${this.courseId}/${materialType}`)
    ).key;
    const updates: { [key: string]: any } = {};
    if (assessment.length != 0) {
      const newAssignmentKey = push(
        child(this.dbRef, `courses/${this.courseId}/${materialType}`)
      ).key;
      console.log(assessmentDescription);
      updates[`/courses/ ${this.courseId}/Assignments/${newAssignmentKey}`] = {
        title: assessment,
        description: assessmentDescription,
        deadLine: endDate,
      };
      update(this.dbRef, updates);
      //Get all students enrolled in this course
      get(child(this.dbRef, '/users')).then((snapshot) => {
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).forEach((key) => {
            if (snapshot.val()[key].role == 'student') {
              Object.entries(snapshot.val()[key].Courses || {}).map(
                ([courseId, courseData]: [string, any]) => {
                  if (courseId == this.courseId) {
                    this.students.push({ id: key });
                  }
                }
              );
            }
          });

          for (let i = 0; i < this.students.length; i++) {
            set(
              child(
                this.dbRef,
                `/users/${this.students[i].id}/Courses/${this.courseId}/Materials/${newAssignmentKey}`
              ),
              {
                title: assessment,
                description: assessmentDescription,
                deadLine: endDate,
                solved: false,
              }
            );
          }
        } else {
          console.log('none');
        }
      });
    }
    for (let i = 0; i < this.students.length; i++) {
      set(
        child(
          this.dbRef,
          `/users/${this.students[i].id}/Courses/${this.courseId}/Materials/${newMaterialKey}`
        ),
        {
          title: material,
          description: materialDescription,
          done: false,
        }
      );
    }

    updates[`/courses/ ${this.courseId}/${materialType}/${newMaterialKey}`] = {
      title: material,
      description: materialDescription,
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
