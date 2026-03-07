import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutFooter } from './layout-footer/layout-footer';
import { LayoutHeader } from './layout-header/layout-header';

@Component({
  selector: 'layout',
  imports: [LayoutHeader, RouterOutlet, LayoutFooter],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Layout { }
