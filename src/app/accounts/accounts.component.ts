import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  selectedType: string = 'students';
  accounts: any[] = [
    // Example data
    { id: 1, name: 'Student 1', status: 'Active', type: 'students' },
    { id: 2, name: 'Student 2', status: 'Active', type: 'students' },
    { id: 3, name: 'Instructor 1', status: 'Active', type: 'instructors' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    this.accounts = storedAccounts.length ? storedAccounts : this.accounts;
  }

  get filteredAccounts() {
    // Add the index of the account in the original array to the filtered results
    return this.accounts
      .map((account, index) => ({ ...account, originalIndex: index }))
      .filter((acc) => acc.type === this.selectedType);
  }

  deleteAccount(index: number) {
    const originalIndex = this.filteredAccounts[index].originalIndex;
    this.accounts.splice(originalIndex, 1);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  toggleAccountStatus(index: number) {
    const originalIndex = this.filteredAccounts[index].originalIndex;
    const account = this.accounts[originalIndex];
    account.status = account.status === 'Active' ? 'In-Active' : 'Active';
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  addAccount(account: any) {
    account.id = new Date().getTime(); // Unique ID for the account
    this.accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

  navigateToAdd() {
    this.router.navigate(['/add-account']);
  }


}


