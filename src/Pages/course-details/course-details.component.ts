import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ToastrService],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  filterBy: String = 'Lecture';
  constructor(private toastr: ToastrService) {}
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
