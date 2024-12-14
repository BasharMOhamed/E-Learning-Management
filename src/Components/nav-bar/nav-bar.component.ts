import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  expandMore: boolean = false;
  showMenu: boolean = false;

  constructor(private auth: AuthService, private route: Router) {}

  toogleExpandMore(): void {
    this.expandMore = !this.expandMore;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logOut() {
    this.auth.logout();
    this.route.navigate(['/auth']);
  }
}
