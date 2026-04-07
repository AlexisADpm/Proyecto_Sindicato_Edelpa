import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-home-beneficios',
  standalone: true,
  imports: [AnimarEnScrollDirective],
  templateUrl: './home-beneficios.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBeneficios { }
