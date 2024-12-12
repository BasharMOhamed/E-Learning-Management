import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private auth: AuthService) {}
  username: any;
  expandMore: boolean = false;
  showMenu: boolean = false;

  ngOnInit() {
    const user = getAuth().currentUser;
    if (user != null) {
      this.username = user.displayName?.split(' ')[0];
    }
  }

  logout() {
    this.auth.firebaseAuth.signOut();
  }

  toogleExpandMore(): void {
    this.expandMore = !this.expandMore;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
