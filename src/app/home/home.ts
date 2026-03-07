import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeBeneficios } from './home-beneficios/home-beneficios';
import { HomeCarrusel } from './home-carrusel/home-carrusel';
import { HomeHistoria } from './home-historia/home-historia';
import { HomeHitos } from './home-hitos/home-hitos';
import { HomeTestimonios } from './home-testimonios/home-testimonios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HomeCarrusel, HomeHistoria, HomeTestimonios, HomeHitos, HomeBeneficios],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home { }
