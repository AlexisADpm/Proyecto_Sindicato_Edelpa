import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//Inicializacion de Swiper
register();

//Angular por defecto
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
