import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GradingFormComponent } from './grading/grading.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GradingFormComponent, ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-Learning-Project';
}
