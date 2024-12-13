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
      const newAccount = {
        name: form.value.name,
        type: form.value.type,
        status: 'Active',
      };

      // Retrieve existing accounts from local storage
      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      accounts.push(newAccount);

      // Save updated accounts to local storage
      localStorage.setItem('accounts', JSON.stringify(accounts));

      // Navigate to the accounts list page
      this.router.navigate(['accounts']);
    }
  }

}
