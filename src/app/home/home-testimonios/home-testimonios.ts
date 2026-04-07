import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-home-testimonios',
  standalone: true,
  imports: [AnimarEnScrollDirective],
  templateUrl: './home-testimonios.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTestimonios { }
