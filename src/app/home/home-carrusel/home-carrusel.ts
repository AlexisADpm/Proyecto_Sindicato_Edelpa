import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-carrusel',
  standalone: true,
  imports: [],
  templateUrl: './home-carrusel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCarrusel { }
