import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}
  // ngOnInit() {
  //   if (this.auth.firebaseAuth.currentUser == null) {
  //     this.router.navigateByUrl('auth');
  //   }
  // }
}
