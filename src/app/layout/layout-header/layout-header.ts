import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './layout-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeader { }
