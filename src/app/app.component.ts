import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}
  LoggedIn!: boolean;

  ngOnInit() {
    const user = getAuth().currentUser;
    if (user != null) {
      this.LoggedIn = true;
    } else {
      this.LoggedIn = false;
    }
  }
}
export class AppComponent {
  title = 'e-learning-project';
}
