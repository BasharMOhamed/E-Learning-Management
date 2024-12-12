import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from '../../Components/course-card/course-card.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getDatabase, get, ref, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, CourseCardComponent, RouterModule],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent implements OnInit {
  database: any;
  userId: String = '';
  searchText: string = '';
  dbRef = ref(getDatabase());
  courses: any[] = [];
  filteredCourses: any[] = [];

  constructor(private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.database = getDatabase();
    this.userId = this.auth.userId;
    get(child(this.dbRef, `/users/${this.userId}/Courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val);
          this.courses = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          this.filteredCourses = this.courses;
          console.log(this.courses);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  searchCourses(title: String): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.title.toLowerCase().includes(title.trim().toLowerCase())
    );
  }

  getStudentCourses(): Observable<any[]> {
    return new Observable((observer) => {
      const coursesRef = `users/${this.userId}/Courses`;
      get(child(this.dbRef, coursesRef))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Convert snapshot.val() to array of objects
            const dataArray = Object.keys(snapshot.val()).map((key) => ({
              id: key,
              ...snapshot.val()[key],
            }));
            observer.next(dataArray);
          } else {
            observer.next([]);
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
