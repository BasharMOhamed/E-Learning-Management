import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {
  getDatabase,
  get,
  ref,
  update,
  child,
  set,
} from '@angular/fire/database';
import { AuthService } from '../../app/auth.service';
import { Router } from '@angular/router';
import { CourseService } from '../../app/course.service';
import { CommonModule } from '@angular/common';

interface Course {
  progress: number;
  [key: string]: any;
}

@Component({
  selector: 'app-grading-form',
  standalone: true,
  imports: [FormsModule, NavBarComponent, CommonModule],
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css'],
})
export class GradingFormComponent implements OnInit {
  database = getDatabase();
  studentName = '';
  courseName = '';
  assessment = 'Midterm';
  grade = '';
  courses: any[] = [];
  users: any[] = [];

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private courseServ: CourseService
  ) {}

  ngOnInit(): void {
    this.fetchAllStudents();
    this.fetchCourses();
  }

  fetchCourses() {
    // const userCoursesRef = ref(this.database, `/courses`);
    // get(userCoursesRef).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     const courseObj = snapshot.val();
    //     this.courses = Object.entries(courseObj).map(([key, value]) => {
    //       return { id: key, ...(value as Course) };
    //     });
    //   } else {
    //     console.log('No data available');
    //   }
    // });
    const id = this.auth.userId;
    this.courseServ.getCourseById(id);
    this.courseServ.instructorCourse$.subscribe((courses) => {
      this.courses = courses;
      console.log(this.courses);
    });
  }

  fetchAllStudents() {
    const usersRef = ref(this.database, '/users');
    get(child(ref(this.database), '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (snapshot.val()[key].role == 'student') {
            console.log(snapshot.val()[key]);
            this.users.push({
              id: key,
              username: snapshot.val()[key].username,
              courses: Object.entries(snapshot.val()[key].Courses || {}).map(
                ([courseId, courseData]: [string, any]) => ({
                  name: courseData.name,
                  progress: courseData.progress.toString(),
                })
              ),
            });
          }
        });
      } else {
        console.log('none');
      }
    });
  }

  uploadGrading() {
    const student = this.users.find(
      (user) => user.username == this.studentName
    );
    console.log(student, this.users);

    const subject = this.courses.find(
      (course) => course.name == this.courseName
    ).id;
    console.log(subject);

    const courseFound = student.courses.find(
      (c: { name: string }) => c.name == this.courseName
    );
    if (courseFound) {
      set(
        child(
          ref(this.database),
          `/users/${
            student.id
          }/Courses/${subject}/grades/${this.assessment.trim()}`
        ),
        this.grade
      )
        .then((response) => {
          this.toastr.success('Form submitted successfully', 'success');
          this.router.navigate(['course-management']);
        })
        .catch((error) => console.log(error));
    } else {
      this.toastr.error('Student does not have this course');
    }
  }

  submitForm() {
    if (this.studentName && this.courseName && this.assessment && this.grade) {
      this.uploadGrading();
    } else {
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
}
