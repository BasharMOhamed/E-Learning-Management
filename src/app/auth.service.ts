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
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firebaseDatabase = inject(Database);
  constructor(private router: Router) {}
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

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
}
