import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    // const user = getAuth().currentUser;
    // if (user != null) {
    //   this.router.navigateByUrl('/home');
    // }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      const { email, password } = form.value;
      try {
        this.auth
          .login(email, password)
          .then(() => {
            this.router.navigateByUrl('/');
            this.toastr.success('Login Successfully!', 'success');
          })
          .catch((e) => {
            this.toastr.error('Invalid credentials');
          });
      } catch (e) {
        this.toastr.error('Invalid credentials');
      }
      form.reset();
    } else {
    }
  }
}
