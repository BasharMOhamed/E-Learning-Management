import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { getDatabase, get, ref, child, set } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Add CommonModule to imports array
  templateUrl: './assign-students.component.html',
  styleUrls: ['./assign-students.component.css'],
})
export class AssignStudentsComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  dbRef = ref(getDatabase());
  courses: any[] = [];
  students: any[] = [];
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getCourses();
    this.getStudents();
  }

  constructor(private fb: FormBuilder, private route: Router) {
    this.myForm = this.fb.group({
      courseName: ['', Validators.required],
      studentName: ['', Validators.required],
      studentLevel: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.myForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  getCourses() {
    get(child(this.dbRef, '/courses')).then((snapshot) => {
      if (snapshot.exists()) {
        this.courses = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          name: snapshot.val()[key].name,
          hours: snapshot.val()[key].hours,
          instructor: snapshot.val()[key].instructor,
          description: snapshot.val()[key].description,
          academicYear: new Date().getFullYear(),
        }));
      } else {
        console.log('none');
      }
    });
  }

  getStudents() {
    get(child(this.dbRef, '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (snapshot.val()[key].role == 'student') {
            this.students.push({
              id: key,
              name: snapshot.val()[key].username,
              level: snapshot.val()[key].level,
            });
          }
        });
      } else {
        console.log('none');
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const { courseName, studentName, studentLevel } = this.myForm.value;
      const course = this.courses.find((c) => c.name === courseName);
      const studentId = this.students.find(
        (s) => s.name === studentName && s.level == studentLevel
      );
      if (studentId) {
        this.toastr.success('Form submitted successfully!');
        console.log('courseId ' + course);
        console.log('studentId ' + studentId);
        set(ref(getDatabase(), `/users/${studentId.id}/Courses/${course.id}`), {
          academicYear: course.academicYear,
          ID: course.id,
          name: course.name,
          hours: course.hours,
          instructor: course.instructor,
          description: course.description,
          progress: 0,
        }).then(() => {
          this.route.navigate(['course-table']);
        });
      } else {
        console.log('here');

        this.toastr.warning(
          'Student not found or does not match the selected level.'
        );
      }
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
