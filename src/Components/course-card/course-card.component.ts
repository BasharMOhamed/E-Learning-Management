import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input() hours: number = 0;
  @Input() instructor: string = '';
  @Input() description: string = '';
  @Input() title: string = '';
}
