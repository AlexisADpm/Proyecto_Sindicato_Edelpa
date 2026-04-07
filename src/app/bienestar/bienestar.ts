import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimarEnScrollDirective } from '../shared/directives/animar-en-scroll.directive';

@Component({
  selector: 'app-bienestar',
  imports: [AnimarEnScrollDirective],
  templateUrl: './bienestar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bienestar { }
