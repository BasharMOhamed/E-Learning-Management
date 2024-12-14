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
import { getAuth } from '@angular/fire/auth';

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
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const { email, password } = form.value;
      this.auth.login(email, password);
      console.log(this.auth.firebaseAuth.currentUser?.uid);
      console.log('Logged in successfully');
      this.auth.setUserId(this.auth.firebaseAuth.currentUser?.uid ?? '');
      this.auth.getUserRole();
      form.reset();
    } else {
      console.log(form.get('email')?.errors);
    }
  }
}
