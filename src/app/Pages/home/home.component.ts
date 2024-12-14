import { Component, OnInit } from '@angular/core';

import { getDatabase, get, ref, set, object } from '@angular/fire/database';
import { getAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { get, getDatabase, ref, set } from 'firebase/database';

interface Course {
  progress: number;
  [key: string]: any;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  notCompleted: any[] = [];
  Completed: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const user = getAuth().currentUser;
    if (user != null) {
      this.fetchCourses();
    }
    // } else {
    //   getAuth().signOut;
    //   this.router.navigateByUrl('/auth');
    // }
  }

  fetchCourses() {
    const database = getDatabase();
    const userID = getAuth().currentUser?.uid;
    console.log(userID);
    const userCoursesRef = ref(database, `users/${userID}/Courses`);
    get(userCoursesRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const courseObj = snapshot.val();
        const coursesArray = Object.entries(courseObj).map(([key, value]) => {
          return { ...(value as Course) };
        });
        console.log(coursesArray);

        coursesArray.forEach((course) => {
          if (course.progress < 100) {
            this.notCompleted.push(course);
          } else {
            this.Completed.push(course);
          }
        });

        console.log('Not Completed:', this.notCompleted);
        console.log('Completed:', this.Completed);
      } else {
        console.log('No data available');
      }
    });
  }

  navigateToCourse(courseID: string) {
    this.router.navigateByUrl(`courses/${courseID}`);
  }
}
