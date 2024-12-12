import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getDatabase, get, ref, child, Database } from '@angular/fire/database';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ToastrService],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  dbRef = ref(getDatabase());
  filterBy: String = 'Lecture';
  courseName: String = '';
  courseId: String = '';
  lectures: any[] = [];
  assignments: any[] = [];
  readings: any[] = [];
  multiMedia: any[] = [];
  constructor(private toastr: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.getLectures();
      this.getAssignments();
      this.getMultiMedia();
      this.getReadings();
      this.getCourseName();
    });
  }

  getCourseName() {
    get(child(this.dbRef, `/courses/${this.courseId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().name);
          this.courseName = snapshot.val().name;
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  getLectures() {
    get(child(this.dbRef, `/courses/${this.courseId}/Lectures`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.lectures = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          console.log(this.lectures);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  getMultiMedia() {
    get(child(this.dbRef, `/courses/${this.courseId}/MultiMedia`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.multiMedia = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          console.log(this.multiMedia);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  getReadings() {
    get(child(this.dbRef, `/courses/${this.courseId}/Readings`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.readings = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          console.log(this.readings);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  getAssignments() {
    get(child(this.dbRef, `/courses/${this.courseId}/Assignments`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.assignments = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          console.log(this.assignments);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  solve(assignment: any) {
    this.toastr.success('Assignment Solved Successfully!', 'Success');
    this.assignments = this.assignments.map((assi) => {
      if (assi == assignment) {
        assi.solved = true;
      }
      return assi;
    });
  }

  filter(value: String): void {
    this.filterBy = value;
  }

  showSuccess(): void {
    this.toastr.success('Material downloaded Succesfully!', 'Success');
  }

  openVideo(): void {
    this.toastr.success('Video Opened');
  }
}
