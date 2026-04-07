import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-home-hitos',
  standalone: true,
  imports: [AnimarEnScrollDirective],
  templateUrl: './home-hitos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHitos { }
