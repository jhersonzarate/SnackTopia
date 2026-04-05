import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito';
import { CarritoItem } from '../../models/carrito-item.model';

@Component({
  selector: 'app-carrito-lateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-lateral.html',
  styleUrl: './carrito-lateral.scss'
})
export class CarritoLateralComponent {
  carrito = inject(CarritoService);
  router  = inject(Router);

  @Output() cerrar = new EventEmitter<void>();

  eliminar(id: string): void { this.carrito.eliminar(id); }
  menos(item: CarritoItem): void { this.carrito.actualizarCantidad(item.id, item.cantidad - 1); }
  mas(item: CarritoItem): void  { this.carrito.actualizarCantidad(item.id, item.cantidad + 1); }

  irPago(): void {
    this.cerrar.emit();
    this.router.navigate(['/checkout']);
  }

  seguirNavegando(): void {
    this.cerrar.emit();
    this.router.navigate(['/productos']);
  }

  formatPrecio(n: number): string { return `S/. ${n.toFixed(2)}`; }
}