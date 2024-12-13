import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { GradingFormComponent } from '../Components/grading/grading.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FirebaseAppModule,
    GradingFormComponent,
    ToastrModule,
    NavBarComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
