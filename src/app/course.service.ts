import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  getDatabase,
  get,
  ref,
  child,
  push,
  set,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  dbRef = ref(getDatabase());
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();

  getAllCourses() {
    get(child(this.dbRef, `/courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.coursesSubject.next(
            Object.keys(snapshot.val()).map((key) => ({
              id: key,
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

  addCourse(course: any, id?: string) {
    if (id) {
      console.log('editing ' + course + ' ' + id);

      set(child(this.dbRef, `courses/${id}`), course);
    } else {
      console.log('adding ' + course);

      const newCourseKey = push(child(this.dbRef, `courses`)).key;
      set(child(this.dbRef, `courses/ ${newCourseKey}`), course);
    }
    const currentCourses = this.coursesSubject.value;
    this.coursesSubject.next([...currentCourses, course]);
  }

  toggleArchive(courseId: String, bool: boolean) {
    set(child(this.dbRef, `courses/${courseId}/isArchived`), bool);
  }
}
