import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getDatabase, get, ref, child } from '@angular/fire/database';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  dbRef = ref(getDatabase());
  selectedType: string = 'students';
  accounts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    get(child(this.dbRef, '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        Object.keys(snapshot.val()).forEach((key) => {
          if (
            snapshot.val()[key].role == 'student' ||
            snapshot.val()[key].role == 'instructor'
          ) {
            this.accounts.push({
              id: snapshot.val()[key].username,
              courses: Object.entries(snapshot.val()[key].Courses || {}).map(
                ([courseId, courseData]: [string, any]) => ({
                  name: courseData.name,
                  progress: courseData.progress.toString(),
                })
              ),
            });
          }
        });
      } else {
        console.log('none');
      }
    });
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
