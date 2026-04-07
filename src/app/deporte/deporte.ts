import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-deporte',
  imports: [AnimarEnScrollDirective],
  templateUrl: './deporte.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Deporte { }
