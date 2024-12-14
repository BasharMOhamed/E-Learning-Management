import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1), // Complete after one emission
      map((isLoggedIn) => {
        console.log(isLoggedIn);

        if (!isLoggedIn) {
          this.router.navigate(['/auth']);
          return false;
        }
        return true;
      })
    );
  }
}
