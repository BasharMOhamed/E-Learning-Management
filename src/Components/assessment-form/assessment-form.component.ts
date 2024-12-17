import { CourseService } from './../../app/course.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AssessmentFormComponent implements OnInit {
  dbRef = ref(getDatabase());
  assessmentForm: FormGroup;
  materialsForm: FormGroup;
  courseId: any;
  students: any[] = [];
  selectedMaterial = 'Assignments';
  course: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private courseServ: CourseService
  ) {
    this.assessmentForm = this.fb.group({
      assessment: ['', Validators.required],
      assessmentFile: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assessmentDescription: ['', Validators.required],
    });
    this.materialsForm = this.fb.group({
      material: ['', Validators.required],
      materialFile: ['', Validators.required],
      materialDescription: ['', Validators.required],
      materialType: ['Lectures', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('here');

    this.activeRoute.params.subscribe((params) => {
      this.courseId = params['id'];
      this.getCourseDetails();
    });
  }

  getCourseDetails() {
    console.log(this.courseId);

    get(child(this.dbRef, `/courses/ ${this.courseId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.course = snapshot.val();
        console.log(this.course);
      }
    });
  }
  navigateToCourses() {
    this.router.navigate(['/course-management']);
  }

  uploadMaterial() {
    const { material, materialType, materialDescription } =
      this.materialsForm.value;
    const newMaterialKey = push(
      child(this.dbRef, `courses/${this.courseId}/${materialType}`)
    ).key;
    const updates: { [key: string]: any } = {};

    updates[`/courses/ ${this.courseId}/${materialType}/${newMaterialKey}`] = {
      title: material,
      description: materialDescription,
    };
    update(this.dbRef, updates);
    //Get all students enrolled in this course
    // get(child(this.dbRef, '/users')).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     Object.keys(snapshot.val()).forEach((key) => {
    //       if (snapshot.val()[key].role == 'student') {
    //         Object.entries(snapshot.val()[key].Courses || {}).map(
    //           ([courseId, courseData]: [string, any]) => {
    //             if (courseId == this.courseId) {
    //               this.students.push({ id: key });
    //             }
    //           }
    //         );
    //       }
    //     });

    // for (let i = 0; i < this.students.length; i++) {
    //   set(
    //     child(
    //       this.dbRef,
    //       `/users/${this.students[i].id}/Courses/${this.courseId}/Materials/${newAssignmentKey}`
    //     ),
    //     {
    //       title: assessment,
    //       description: assessmentDescription,
    //       deadLine: endDate,
    //       solved: false,
    //     }
    //   );
    // }

    // for (let i = 0; i < this.students.length; i++) {
    //   set(
    //     child(
    //       this.dbRef,
    //       `/users/${this.students[i].id}/Courses/${this.courseId}/Materials/${newMaterialKey}`
    //     ),
    //     {
    //       title: material,
    //       description: materialDescription,
    //       done: false,
    //     }
    //   );
    // }
  }

  uploadAssignments() {
    const { assessment, assessmentDescription, endDate } =
      this.assessmentForm.value;
    const updates: { [key: string]: any } = {};
    const newAssignmentKey = push(
      child(this.dbRef, `courses/${this.courseId}/Assignments`)
    ).key;
    console.log(assessmentDescription);
    updates[`/courses/ ${this.courseId}/Assignments/${newAssignmentKey}`] = {
      title: assessment,
      description: assessmentDescription,
      deadLine: endDate,
      solved: false,
    };
    update(this.dbRef, updates);
  }

  submitAssignments() {
    if (this.assessmentForm.valid) {
      this.toastr.success('Form submitted successfully', 'success');
      this.uploadAssignments();
      this.navigateToCourses();
    } else {
      this.assessmentForm.markAllAsTouched();
      this.toastr.error('Please fill out all fields before submitting');
    }
  }

  submitMaterials() {
    if (this.assessmentForm.valid) {
      this.toastr.success('Form submitted successfully', 'success');
      this.uploadMaterial();
      this.navigateToCourses();
    } else {
      this.materialsForm.markAllAsTouched();
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
}
