import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getDatabase, get, ref, child } from '@angular/fire/database';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  dbRef = ref(getDatabase());
  courses: any[] = [];
  selectedCourse = 'Course Name';
  students: any[] = [];
  filteredStudents: any[] = [];

  constructor(public auth: AuthService) {}
  ngOnInit(): void {
    this.getCourses();
    this.getStudents();
  }

  getCourses() {
    get(child(this.dbRef, `users/${this.auth.userId}/Courses`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          this.courses = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            name: snapshot.val()[key].name,
          }));
          this.courses.push({ id: 'all', name: this.selectedCourse });
        } else {
          console.log('none');
        }
      }
    );
  }

  getStudents() {
    get(child(this.dbRef, '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (snapshot.val()[key].role == 'student') {
            this.students.push({
              id: snapshot.val()[key].username,
              courses: Object.entries(snapshot.val()[key].Courses || {}).map(
                ([courseId, courseData]: [string, any]) => ({
                  name: courseData.name,
                  progress: courseData.progress.toString(),
                  instructor: courseData.instructor,
                })
              ),
            });
          }
        });
        this.filteredStudents = [];
      } else {
        console.log('none');
      }
    });
  }

  // filterByCourse() {
  //   if (this.selectedCourse === 'All Students') {
  //     this.filteredStudents = this.students.filter((student) => {
  //       for (let i = 0; i < student.courses.length; i++) {
  //         console.log(student.courses[i].instructor);
  //         return student.courses[i].instructor.includes(this.auth.username)
  //       }
  //     });
  //   } else {
  //     this.filteredStudents = this.students.filter((student) => {
  //       console.log(student);
  //       for (let i = 0; i < student.courses.length; i++) {
  //         console.log(this.selectedCourse, student.courses[i]);
  //         if (student.courses[i].name == this.selectedCourse) return student;
  //       }
  //     });
  //   }
  // }

  filterByCourse() {
    if (this.selectedCourse === 'Course Name') {
      this.filteredStudents = [];
    } else {
      this.filteredStudents = this.students.filter((student) => {
        return student.courses.some((course: any) => {
          console.log(
            course.name,
            this.selectedCourse,
            this.auth.username,
            course.instructor
          );
          return (
            course.name === this.selectedCourse &&
            course.instructor.includes(this.auth.username)
          );
        });
      });
    }
  }
}
