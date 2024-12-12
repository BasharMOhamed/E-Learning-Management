import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, getDatabase, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { catchError, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firebaseDatabase = inject(Database);
  constructor(private router: Router, private toastr: ToastrService) {}
  register(
    username: string,
    email: string,
    ssn: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, { displayName: username });
      const db = getDatabase();
      const userId = response.user.uid;
      set(ref(db, `users/${userId}`), {
        username: username,
        email: email,
        ssn: ssn,
        role: 'student',
        status: 'pending',
      });
    });

    return from(promise);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }
}
