import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"labiv-tp","appId":"1:1050156996847:web:37cbd323a27df62a21e31a","storageBucket":"labiv-tp.appspot.com","apiKey":"AIzaSyCs2qZgADfo3NLHq56EUOmJmSa_keDje4o","authDomain":"labiv-tp.firebaseapp.com","messagingSenderId":"1050156996847"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
