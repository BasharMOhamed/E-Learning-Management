import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getDatabase, get, ref, child } from '@angular/fire/database';

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
  selectedCourse = 'All Courses';
  students: any[] = [];
  filteredStudents: any[] = [];
  studentsCount = 0;

  ngOnInit(): void {
    this.getCourses();
    this.getStudents();
  }

  getCourses() {
    get(child(this.dbRef, '/courses')).then((snapshot) => {
      if (snapshot.exists()) {
        this.courses = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          name: snapshot.val()[key].name,
        }));
        this.courses.push({ id: 'all', name: this.selectedCourse });
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
              id: snapshot.val()[key].username,
              courses: Object.entries(snapshot.val()[key].Courses || {}).map(
                ([courseId, courseData]: [string, any]) => ({
                  name: courseData.name,
                  progress: courseData.progress.toString(),
                })
              ),
            });
            this.students.forEach((student) => {
              console.log('length ' + student.courses.length);

              if (student.courses.length > 0) {
                this.studentsCount++;
              }
            });
          }
        });
        this.filteredStudents = this.students;
      } else {
        console.log('none');
      }
    });
  }

  filterByCourse() {
    // console.log(this.selectedCourse);

    if (this.selectedCourse === 'All Students') {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter((student) => {
        console.log(student.courses);

        for (let i = 0; i < student.courses.length; i++) {
          console.log('here');

          if (student.courses[i].name == this.selectedCourse) {
            console.log('true');
            console.log(student);

            return true;
          }
        }
        return false;
      });
    }
  }
}
