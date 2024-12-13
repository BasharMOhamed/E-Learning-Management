import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  getDatabase,
  get,
  ref,
  child,
  remove,
  update,
} from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  dbRef = ref(getDatabase());
  selectedType: string = 'student';
  accounts: any[] = [];
  toastr = inject(ToastrService);

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
              id: key,
              name: snapshot.val()[key].username,
              status: snapshot.val()[key].status,
              type: snapshot.val()[key].role,
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
    const userId = this.filteredAccounts[index].id;
    this.accounts.splice(originalIndex, 1);
    remove(child(this.dbRef, `/users/${userId}`)).then(() => {
      this.toastr.success('Account deleted successfully');
    });
  }

  toggleAccountStatus(index: number) {
    const originalIndex = this.filteredAccounts[index].originalIndex;
    const userId = this.filteredAccounts[index].id;
    const account = this.accounts[originalIndex];
    account.status = account.status === 'Active' ? 'In-Active' : 'Active';
    const updates: { [key: string]: any } = {};
    updates['/users/' + userId + '/status'] = account.status;
    update(this.dbRef, updates);
  }

  addAccount(account: any) {
    account.id = new Date().getTime(); // Unique ID for the account
    this.accounts.push(account);
  }
}
