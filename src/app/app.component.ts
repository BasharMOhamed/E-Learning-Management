import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GradingFormComponent } from './grading/grading.component';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GradingFormComponent,
    ToastrModule,
    NavBarComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-Learning-Project';
}
