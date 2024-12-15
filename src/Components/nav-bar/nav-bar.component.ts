import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/auth.service';
import { child, Database, get, ref } from '@angular/fire/database';

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
  userId: any;
  firebaseDatabase = inject(Database);
  router: any;
  userRole: any;
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


  // firebaseDatabase(firebaseDatabase: any): any {
  //   throw new Error('Method not implemented.');
  // }
}
