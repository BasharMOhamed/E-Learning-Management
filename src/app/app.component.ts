import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CourseDetailsComponent } from '../Pages/course-details/course-details.component';
import { UserProfileComponent } from '../Pages/user-profile/user-profile.component';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FirebaseAppModule,
    NavBarComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
