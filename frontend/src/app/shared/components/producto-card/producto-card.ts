import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss'
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  @Output() verDetalle    = new EventEmitter<string>();
  @Output() agregarCarrito = new EventEmitter<Producto>();

  get estrellas(): string[] {
    return Array(5).fill('').map((_, i) => i < this.producto.rating ? '★' : '☆');
  }
}