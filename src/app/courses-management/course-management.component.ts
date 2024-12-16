import { grades } from '../models/course.model';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CourseService } from '../course.service';
import { getDatabase, get, ref, child } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  myForm: FormGroup;
  dbRef = ref(getDatabase());
  toastr = inject(ToastrService);
  course: any = null;
  options: any[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private courseService: CourseService,
    private router: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      courseName: ['', Validators.required],
      courseHours: ['', Validators.required],
      instructorName: ['', Validators.required], // Now binds to dropdown
      final: ['', Validators.required],
      midterm: ['', Validators.required],
      quizes: ['', Validators.required],
      practical: ['', Validators.required],
      assignments: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.router.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);
      if (id) {
        this.courseService.courses$.subscribe((courses) => {
          this.course = courses.find((c) => c.id === id);
          this.onEdit(this.course);
          this.isEditMode = true;
        });
      }
    });
  }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((values) => {
      console.log('Form Values:', values);
      console.log('Form Valid:', this.myForm.valid);
    });

    this.getAllIntructors();
  }

  getAllIntructors() {
    get(child(this.dbRef, '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (snapshot.val()[key].role == 'instructor') {
            this.options.push({
              id: key,
              name: snapshot.val()[key].username,
            });
          }
        });
        console.log(this.options);
      } else {
        console.log('none');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.myForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      this.toastr.success('Form submitted successfully!');
      this.route.navigate(['course-table']);
      const newCourse = {
        name: this.myForm.value.courseName,
        hours: this.myForm.value.courseHours,
        instructor: this.myForm.value.instructorName,
        grades: {
          final: this.myForm.value.final,
          midterm: this.myForm.value.midterm,
          quizes: this.myForm.value.quizes,
          practical: this.myForm.value.practical,
          assignments: this.myForm.value.assignments,
        },
        description: this.myForm.value.description,
        isArchived: false,
      };
      const instructorId = this.options.find(
        (option) => option.name == newCourse.instructor
      ).id;
      if (this.isEditMode) {
        // Update course
        this.courseService.addCourse(newCourse, instructorId, this.course.id);
      } else {
        // Add new course
        this.courseService.addCourse(newCourse, instructorId);
      }
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  onEdit(course: any) {
    console.log(course);
    this.myForm.patchValue({
      courseName: course.name,
      courseHours: course.hours,
      instructorName: course.instructor,
      final: course.grades.final,
      midterm: course.grades.midterm,
      quizes: course.grades.quizes,
      practical: course.grades.practical,
      assignments: course.grades.assignments,
      description: course.description,
    });
  }
}
