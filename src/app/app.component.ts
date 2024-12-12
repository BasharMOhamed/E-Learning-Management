import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { GradingFormComponent } from '../Components/grading/grading.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FirebaseAppModule,
    ToastrModule,
    NavBarComponent,
    RouterModule,
    DashboardComponent,
    GradingFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
