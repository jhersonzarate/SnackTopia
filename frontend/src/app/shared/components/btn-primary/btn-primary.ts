import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  standalone: true,
  template: `
    <button class="btn-primary" [type]="type" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: [`
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #000;
      color: #fff;
      border: 2px solid #000;
      border-radius: 9999px;
      padding: 12px 28px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.25s;
      font-family: 'Poppins', sans-serif;
      white-space: nowrap;
    }
    .btn-primary:hover { background: #ffcc00; color: #000; border-color: #ffcc00; }
  `]
})
export class BtnPrimaryComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<void>();
}