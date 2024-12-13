import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() duration: string = '';
  @Input() author: string = '';
  @Input() image: string = '';
  @Input() editable: boolean = false;
  @Output() edit = new EventEmitter<void>();
  //@Input() editable: boolean = false; 
  onEdit() {
    this.edit.emit();
  }
}

