import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { getDatabase, get, ref, child } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  dbRef = ref(getDatabase());
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getUserRole(userId: String) {
    get(child(this.dbRef, `/users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().role.toString());

          const userRole = snapshot.val().role.toString();
          console.log('role: ' + userRole);
          if (userRole == 'instructor') {
            this.router.navigate(['course-management']);
          } else if (userRole == 'student') {
            this.router.navigate(['Courses']);
          }
        } else {
        }
      })
      .catch((error) => console.log(error));
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const { email, password } = form.value;
      this.auth.login(email, password);
      console.log(this.auth.firebaseAuth.currentUser);
      console.log('Logged in successfully');

      this.getUserRole(this.auth.firebaseAuth.currentUser?.uid ?? '');

      this.auth.setUserId(this.auth.firebaseAuth.currentUser?.uid ?? '');
      form.reset();
    } else {
      console.log(form.get('email')?.errors);
    }
  }
}
