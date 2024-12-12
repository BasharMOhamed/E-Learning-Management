import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';

export const routes: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'add-account', component: AddAccountComponent },
];

