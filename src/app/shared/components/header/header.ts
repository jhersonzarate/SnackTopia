import { Component, inject, signal, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { CarritoService } from '../../../core/services/carrito';
import { ProductoService } from '../../../core/services/producto';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  auth     = inject(AuthService);
  carrito  = inject(CarritoService);
  prodSvc  = inject(ProductoService);

  @Output() abrirCarrito  = new EventEmitter<void>();
  @Output() abrirChatbot  = new EventEmitter<void>();

  textoBusqueda = signal('');
  sugerencias   = signal<Producto[]>([]);
  mostrarSugerencias = signal(false);

  @Output() navegarDetalle = new EventEmitter<string>();

  buscar(texto: string): void {
    this.textoBusqueda.set(texto);
    if (texto.trim().length < 2) {
      this.sugerencias.set([]);
      this.mostrarSugerencias.set(false);
      return;
    }
    const resultados = this.prodSvc.buscar(texto);
    this.sugerencias.set(resultados.slice(0, 6));
    this.mostrarSugerencias.set(resultados.length > 0);
  }

  seleccionarSugerencia(id: string): void {
    this.mostrarSugerencias.set(false);
    this.textoBusqueda.set('');
    this.navegarDetalle.emit(id);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.mostrarSugerencias.set(false);
    }
  }

  logout(): void {
    this.auth.logout();
  }

  formatPrecio(n: number): string {
    return `S/. ${n.toFixed(2)}`;
  }

  formatTotal(): string {
    return `S/. ${this.carrito.totalPrecio().toFixed(2)}`;
  }
}