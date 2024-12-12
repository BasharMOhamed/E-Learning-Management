import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { Auth, getAuth } from '@angular/fire/auth';
// import { getDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ssn: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async onSubmit(form: FormGroup) {
    if (form.valid) {
      const { username, email, ssn, password } = form.value;
      try {
        this.authService.register(username, email, ssn, password);
        form.reset();
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigateByUrl('auth');
      } catch (e) {
        console.log(e);
        this.toastr.error('Registration failed. Please try again.', 'Error', {
          timeOut: 3000,
        });
      }
    } else {
      console.log(form.get('username')?.errors);
    }
  }
}
