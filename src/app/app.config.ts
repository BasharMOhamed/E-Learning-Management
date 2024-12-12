import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      BrowserAnimationsModule, // Required for animations
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'e-learning-management-1a3c0',
        appId: '1:418808068491:web:fa0147594538821058578e',
        databaseURL:
          'https://e-learning-management-1a3c0-default-rtdb.firebaseio.com',
        storageBucket: 'e-learning-management-1a3c0.firebasestorage.app',
        apiKey: 'AIzaSyDXw2IWlEZjhuVqoWhWFl3Lj9Zm2FE2jM8',
        authDomain: 'e-learning-management-1a3c0.firebaseapp.com',
        messagingSenderId: '418808068491',
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
}};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"e-learning-management-1a3c0","appId":"1:418808068491:web:fa0147594538821058578e","databaseURL":"https://e-learning-management-1a3c0-default-rtdb.firebaseio.com","storageBucket":"e-learning-management-1a3c0.firebasestorage.app","apiKey":"AIzaSyDXw2IWlEZjhuVqoWhWFl3Lj9Zm2FE2jM8","authDomain":"e-learning-management-1a3c0.firebaseapp.com","messagingSenderId":"418808068491"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
