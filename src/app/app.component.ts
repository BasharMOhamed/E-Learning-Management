import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
//import { CourseCardComponent } from '../Components/course-card/course-card.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AccountsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-learning-project';
}
