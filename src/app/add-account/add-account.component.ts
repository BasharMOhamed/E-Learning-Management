import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent {
  account = { name: '', status: 'Active', type: 'students' };

  constructor(private router: Router) {}

  submit(form: any) {
    if (form.valid) {
      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      accounts.push(this.account);
      localStorage.setItem('accounts', JSON.stringify(accounts));
      this.router.navigate(['/']);
    }
  }
}

