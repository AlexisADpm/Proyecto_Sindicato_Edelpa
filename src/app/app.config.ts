import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';

//Servicio firebase

const firebaseConfig = {
  apiKey: "AIzaSyC7BLTRlSzTWpcW1IzTuAiWi7HVgp0aN4I",
  authDomain: "sindicato-edelpa-angular.firebaseapp.com",
  projectId: "sindicato-edelpa-angular",
  storageBucket: "sindicato-edelpa-angular.firebasestorage.app",
  messagingSenderId: "376802927436",
  appId: "1:376802927436:web:7cf92751ddc365a14065e9",
  measurementId: "G-204K4HY4CJ"
};



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => {
      return initializeFirestore(getApp(), {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      })
    })
  ]
};
