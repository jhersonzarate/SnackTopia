import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../core/services/producto';
import { CarritoService } from '../../../core/services/carrito';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.scss'
})
export class DetalleProductoComponent implements OnInit {
  prodSvc = inject(ProductoService);
  carrito = inject(CarritoService);
  router  = inject(Router);
  route   = inject(ActivatedRoute);

  producto = signal<Producto | null>(null);
  cantidad = signal(1);
  agregado = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    const p  = this.prodSvc.getById(id);
    if (!p) { this.router.navigate(['/productos']); return; }
    this.producto.set(p);
  }

  get estrellas(): string[] {
    const p = this.producto();
    if (!p) return [];
    return Array(5).fill('').map((_, i) => i < p.rating ? '★' : '☆');
  }

  menos(): void { if (this.cantidad() > 1) this.cantidad.update(c => c - 1); }
  mas():   void { this.cantidad.update(c => c + 1); }

  agregarAlCarrito(): void {
    const p = this.producto();
    if (!p) return;
    this.carrito.agregar({
      id: p.id, nombre: p.nombre, imagen: p.imagen,
      precioOriginal: p.precioOriginal, precioFinal: p.precioFinal
    }, this.cantidad());
    this.agregado.set(true);
    setTimeout(() => this.agregado.set(false), 2000);
  }

  comprarAhora(): void {
    this.agregarAlCarrito();
    this.router.navigate(['/checkout']);
  }

  get ahorro(): string {
    const p = this.producto();
    if (!p) return '';
    return `S/. ${(p.precioOriginal - p.precioFinal).toFixed(2)}`;
  }
}