import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  child,
  Database,
  get,
  getDatabase,
  ref,
  set,
} from '@angular/fire/database';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firebaseDatabase = inject(Database);
  userId: String = '';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticated.asObservable();
  constructor(private router: Router, private toastr: ToastrService) {}
  username: any;

  setUserId(userId: String) {
    this.userId = userId;
  }
  setUsername(username: String) {
    this.username = username;
  }

  getUserRole(): String {
    get(child(ref(this.firebaseDatabase), `/users/${this.userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userRole = snapshot.val().role;
          const active = snapshot.val().status;
          if (active == 'Active') {
            if (userRole == 'instructor') {
              this.router.navigate(['Home']);
            } else if (userRole == 'student') {
              this.router.navigate(['Courses']);
            } else if (userRole == 'admin') {
              this.router.navigate(['accounts']);
            }
            this.toastr.success('Login Successfully!', 'success');
          } else {
            this.toastr.error('Waiting for Admin Activation', 'Failed');
          }
          console.log('role: ' + userRole);
        }
      })
      .catch((error) => console.log(error));
    return '';
  }

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
        level: 1,
      });
    });

    return from(promise);
  }

  login(email: string, password: string) {
    this.isAuthenticated.next(true);
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  logout() {
    this.isAuthenticated.next(false);
    return this.firebaseAuth.signOut();
  }
}
