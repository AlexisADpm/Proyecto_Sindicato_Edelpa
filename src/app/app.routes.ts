import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Sindicato } from './sindicato/sindicato';
import { Galeria } from './galeria/galeria';
import { Deporte } from './deporte/deporte';
import { Bienestar } from './bienestar/bienestar';
import { Documentos } from './documentos/documentos';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      // default child route redirects to home
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'sindicato', component: Sindicato },
      { path: 'galeria', component: Galeria },
      { path: 'deporte', component: Deporte },
      { path: 'bienestar', component: Bienestar },
      { path: 'documentos', component: Documentos },
    ],
  },
  { path: '**', redirectTo: 'home' },
];