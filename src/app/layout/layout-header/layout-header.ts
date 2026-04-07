import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './layout-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeader {
  menuAbierto = signal(false);

  toggleMenu() {
    this.menuAbierto.update(v => !v);
  }
}
