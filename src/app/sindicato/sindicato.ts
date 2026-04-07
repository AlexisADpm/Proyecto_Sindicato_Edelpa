import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-sindicato',
  imports: [AnimarEnScrollDirective],
  templateUrl: './sindicato.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sindicato { }
