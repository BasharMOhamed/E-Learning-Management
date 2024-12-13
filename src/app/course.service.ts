import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();

  addCourse(course: any) {
    const currentCourses = this.coursesSubject.value;
    this.coursesSubject.next([...currentCourses, course]);
  }
}
