import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  getDatabase,
  get,
  ref,
  child,
  Database,
  set,
  update,
} from '@angular/fire/database';
import { AuthService } from '../../app/auth.service';

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
  course: any;
  courseId: String = '';
  lectures: any[] = [];
  assignments: any[] = [];
  readings: any[] = [];
  multiMedia: any[] = [];
  totalMaterials = 0;
  singleProgressValue = 0;
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.courseId = params['id'];
      await this.getLectures();
      await this.getAssignments();
      await this.getMultiMedia();
      await this.getReadings();
      this.singleProgressValue = Math.floor(100 / this.totalMaterials);
      this.getCourseName();
    });
  }

  getCourseName() {
    const userId = this.auth.userId;
    get(child(this.dbRef, `/users/${userId}/Courses/${this.courseId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          this.course = {
            name: snapshot.val().name,
            progress: snapshot.val().progress,
          };
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  async getLectures() {
    await get(child(this.dbRef, `/courses/${this.courseId}/Lectures`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.lectures = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          this.totalMaterials += this.lectures.length;
          console.log(this.totalMaterials);
          console.log(this.lectures);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  async getMultiMedia() {
    await get(child(this.dbRef, `/courses/${this.courseId}/MultiMedia`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.multiMedia = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          this.totalMaterials += this.multiMedia.length;
          console.log(this.totalMaterials);
          console.log(this.multiMedia);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  async getReadings() {
    await get(child(this.dbRef, `/courses/${this.courseId}/Readings`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.readings = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          this.totalMaterials += this.readings.length;
          console.log(this.totalMaterials);
          console.log(this.readings);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  async getAssignments() {
    await get(child(this.dbRef, `/courses/${this.courseId}/Assignments`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.assignments = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          this.totalMaterials += this.assignments.length;
          console.log(this.totalMaterials);
          console.log(this.assignments);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  async uploadProgress() {
    const userId = this.auth.userId;
    const updates: { [key: string]: any } = {};
    const newProgressValue = this.course.progress + this.singleProgressValue;
    console.log('old ' + this.course.progress);
    console.log('new ' + newProgressValue);
    console.log(userId);
    console.log(this.courseId);

    if (newProgressValue <= 100) {
      (updates[`/users/${userId}/Courses/${this.courseId}/progress`] =
        newProgressValue),
        await update(this.dbRef, updates);
    }
  }

  async uploadSolved(assignmentID: String) {
    const updates: { [key: string]: any } = {};
    (updates[`courses/${this.courseId}/Assignments/${assignmentID}/solved`] =
      true),
      await update(this.dbRef, updates);
  }

  solve(assignment: any) {
    this.toastr.success('Assignment Solved Successfully!', 'Success');
    console.log(assignment, assignment);
    this.assignments = this.assignments.map((assi) => {
      if (assi == assignment) {
        assi.solved = true;
        this.uploadSolved(assi.id);
        this.uploadProgress();
      }
      return assi;
    });
  }

  filter(value: String): void {
    this.filterBy = value;
  }

  showSuccess(): void {
    this.toastr.success('Material downloaded Succesfully!', 'Success');
    this.uploadProgress();
  }

  openVideo(): void {
    this.toastr.success('Video Opened');
    this.uploadProgress();
  }
}
