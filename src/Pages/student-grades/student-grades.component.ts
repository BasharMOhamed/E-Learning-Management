import { Component, OnInit } from '@angular/core';
import { getDatabase, get, ref, child } from '@angular/fire/database';
import { AuthService } from '../../app/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.css',
})
export class StudentGradesComponent implements OnInit {
  dbRef = ref(getDatabase());
  academicYear = '2021';
  grades: any[] = [];
  filteredGrades: any[] = [];

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    const userId = this.auth.userId;
    get(child(this.dbRef, `/users/${userId}/Courses`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val()[1].name);
          this.grades = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            grades: snapshot.val()[key].grades,
            name: snapshot.val()[key].name,
            academic_year: snapshot.val()[key].academicYear,
          }));
          this.filteredGrades = this.grades;
          this.filter();
          console.log(this.grades);
        } else {
          console.log('none');
        }
      })
      .catch((error) => console.log(error));
  }

  filter(): void {
    this.filteredGrades = this.grades.filter(
      (grade) => grade.academic_year == this.academicYear
    );
    console.log(this.filteredGrades);
  }
}
