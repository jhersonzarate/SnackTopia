import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge" [style.background]="color">{{ texto }}</span>`,
  styles: [`
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 800;
      color: #000;
    }
  `]
})
export class BadgeComponent {
  @Input() texto = '';
  @Input() color = '#ffcc00';
}