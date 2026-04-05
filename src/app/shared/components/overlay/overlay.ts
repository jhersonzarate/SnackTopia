import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay',
  standalone: true,
  template: `<div class="overlay" (click)="clicked.emit()"></div>`,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9990;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class OverlayComponent {
  @Output() clicked = new EventEmitter<void>();
}