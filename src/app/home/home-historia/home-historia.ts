import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-home-historia',
  standalone: true,
  imports: [AnimarEnScrollDirective],
  templateUrl: './home-historia.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHistoria { }
