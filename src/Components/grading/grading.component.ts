import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { getDatabase, get, ref, update, child } from '@angular/fire/database';
import { AuthService } from '../../app/auth.service';

interface Course {
  progress: number;
  [key: string]: any;
}

@Component({
  selector: 'app-grading-form',
  standalone: true,
  imports: [FormsModule, NavBarComponent],
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css'],
})
export class GradingFormComponent {
  database = getDatabase();
  studentName = '';
  courseName = '';
  assessment = '';
  grade = '';
  courses: any[] = [];
  users: any[] = [];

  constructor(private toastr: ToastrService, private auth: AuthService) {
    this.fetchAllStudents();
    this.fetchCourses();
  }

  fetchCourses() {
    const userCoursesRef = ref(this.database, `/courses`);
    get(userCoursesRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const courseObj = snapshot.val();
        this.courses = Object.entries(courseObj).map(([key, value]) => {
          return { id: key, ...(value as Course) };
        });
      } else {
        console.log('No data available');
      }
    });
  }

  fetchAllStudents() {
    const usersRef = ref(this.database, '/users');
    get(child(ref(this.database), '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (snapshot.val()[key].role == 'student') {
            this.users.push({
              id: snapshot.val()[key].username,
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
    ).id;
    console.log(student);

    const subject = this.courses.find(
      (course) => course.name == this.courseName
    ).id;
    console.log(subject);

    const updates: { [key: string]: any } = {};
    updates[
      `/users/${student}/Courses/${subject}/grades/${this.assessment.trim()}`
    ] = this.grade;

    update(ref(this.database), updates)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  submitForm() {
    if (this.studentName && this.courseName && this.assessment && this.grade) {
      this.toastr.success('Form submitted successfully', 'success');
      this.uploadGrading();
    } else {
      this.toastr.error('Please fill out all fields before submitting');
    }
  }
}
