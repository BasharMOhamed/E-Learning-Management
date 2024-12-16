import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getDatabase,
  get,
  ref,
  child,
  push,
  set,
  remove,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  dbRef = ref(getDatabase());
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();
  private instructorCourses = new BehaviorSubject<any[]>([]);
  instructorCourse$ = this.instructorCourses.asObservable();

  getAllCourses() {
    get(child(this.dbRef, `/courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.coursesSubject.next(
            Object.keys(snapshot.val()).map((key) => ({
              id: key,
              description: snapshot.val()[key].description,
              hours: snapshot.val()[key].hours.toString(),
              name: snapshot.val()[key].name,
              instructor: snapshot.val()[key].instructor,
              grades: snapshot.val()[key].grades,
              isArchived: snapshot.val()[key].isArchived,
            }))
          );

          console.log(this.coursesSubject.value);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  getCourseById(instructorId: String) {
    console.log('id ' + instructorId);

    get(child(this.dbRef, `/users/${instructorId}/Courses`)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.instructorCourses.next(
            Object.keys(snapshot.val()).map((key) => ({
              id: key,
              description: snapshot.val()[key].description,
              hours: snapshot.val()[key].hours.toString(),
              name: snapshot.val()[key].name,
              instructor: snapshot.val()[key].instructor,
              grades: snapshot.val()[key].grades,
              isArchived: snapshot.val()[key].isArchived,
            }))
          );
        }
      }
    );
    return [];
  }

  addCourse(course: any, instructorId: String, id?: string) {
    if (id) {
      id = id.trim();
      console.log('editing ' + course + ' ' + id);
      remove(child(this.dbRef, `users/${instructorId}/Courses/${id}`));
      set(child(this.dbRef, `courses/${id}`), course);
      set(child(this.dbRef, `users/${instructorId}/Courses/${id}`), course);
    } else {
      console.log('adding ' + course);

      const newCourseKey = push(child(this.dbRef, `courses`)).key;
      set(child(this.dbRef, `courses/ ${newCourseKey}`), course);
      set(
        child(this.dbRef, `users/${instructorId}/Courses/${newCourseKey}`),
        course
      );
    }
    const currentCourses = this.coursesSubject.value;
    this.coursesSubject.next([...currentCourses, course]);
  }

  toggleArchive(courseId: String, bool: boolean) {
    set(child(this.dbRef, `courses/${courseId}/isArchived`), bool);
  }
}
