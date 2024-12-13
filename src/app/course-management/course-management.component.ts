import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute , Router} from '@angular/router';
import { DropdownMenuComponent } from "../dropdown-menu/dropdown-menu.component";
import { RouterModule } from '@angular/router';
import { CourseService } from '../course.service';
import { CourseTableComponent } from '../course-table/course-table.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownMenuComponent,RouterModule],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  myForm: FormGroup;
  mode: string | null = null; // 'add' or 'edit'
  courseId: string | null = null;

  courses: any[] = [];
  isEditMode = false;
  editIndex: number | null = null;
  course: any = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,private courseService: CourseService) {
    this.myForm = this.fb.group({
      courseName: ['', Validators.required],
      courseHours: ['', Validators.required],
      status: ['', Validators.required],
      instructorName: ['', Validators.required], // Now binds to dropdown
      studentGrades: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     this.mode = params['mode'];
  //     this.courseId = params['id']; // Only present for edit
  //     console.log('Mode:', this.mode, 'Course ID:', this.courseId);
  //   });
  // }
  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((values) => {
      console.log('Form Values:', values);
      console.log('Form Valid:', this.myForm.valid);
    });

    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courses.find((c) => c.id === courseId);
  }

    isFieldInvalid(field: string): boolean {
    const control = this.myForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form Submitted!', this.myForm.value);
      alert('Form submitted successfully!');


      const formData = this.myForm.value;



      const newCourse = {
        name: this.myForm.value.courseName,
        hours: this.myForm.value.courseHours,
        instructor: this.myForm.value.instructorName,
        status: this.myForm.value.status,
        grades: this.parseGrades(this.myForm.value.studentGrades),

      };
      if (this.isEditMode) {
        // Update course
        if (this.editIndex !== null) {
          this.courses[this.editIndex] = newCourse;
        }
        this.isEditMode = false;
        this.editIndex = null;
      } else {

        // Add new course
        this.courses.push(newCourse);
        console.log(newCourse);
        this.courseService.addCourse(newCourse);
      }

    } else {
      this.myForm.markAllAsTouched();
    }

  }



  onEdit(course: any, index: number) {
    this.isEditMode = true;
    this.editIndex = index;

    this.myForm.patchValue({
      courseName: course.name,
      courseHours: course.hours,
      status: course.status,
      instructorName: course.instructor,
      studentGrades: this.formatGrades(course.grades),
    });
  }
  formatGrades(grades: any): string {
    return `Theoretical: ${grades.theoretical}\nPractical: ${grades.practical}\nYearwork: ${grades.yearwork}\nMidterm: ${grades.midterm}\nQuizzes: ${grades.quizzes}`;
  }
  parseGrades(grades: string): Record<string, number> {
    const defaultGrades = {
      theoretical: 0.0,
      practical: 20,
      yearwork: 15,
      midterm: 15,
      quizzes: 10,
    };

    console.log("Input Grades:", grades);

    // Normalize the input to handle both single-line and multi-line formats
    const gradeParts = grades
      .split(/\s*[\n;]\s*/) // Split by new lines or semi-colons with optional whitespace
      .reduce((acc: Record<string, number>, part: string) => {
        const [key, value] = part.split(":");
        console.log("Processing Part:", part);

        if (key && value) {
          const formattedKey = key.trim().toLowerCase();
          const formattedValue = parseFloat(value.trim()) || 0.0;
          console.log("Formatted Key:", formattedKey, "Formatted Value:", formattedValue);

          // Update only if the key exists in defaultGrades
          if (formattedKey in defaultGrades) {
            acc[formattedKey] = formattedValue;
            console.log("Updated Accumulator:", acc);
          }
        }

        return acc;
      }, {});

    // Merge with default grades to ensure all keys are accounted for
    const finalGrades = { ...defaultGrades, ...gradeParts };

    console.log("Final Parsed Grades:", finalGrades);
    return finalGrades;
  }
}
