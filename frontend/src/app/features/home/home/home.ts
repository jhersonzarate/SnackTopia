import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoCardComponent } from '../../../shared/components/producto-card/producto-card';
import { ProductoService } from '../../../core/services/producto';
import { CarritoService } from '../../../core/services/carrito';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  prodSvc  = inject(ProductoService);
  carrito  = inject(CarritoService);
  router   = inject(Router);

  destacados = this.prodSvc.getAll().slice(0, 8);

  verDetalle(id: string): void {
    this.router.navigate(['/productos', id]);
  }

  agregar(p: Producto): void {
    this.carrito.agregar({
      id: p.id,
      nombre: p.nombre,
      imagen: p.imagen,
      precioOriginal: p.precioOriginal,
      precioFinal: p.precioFinal
    });
  }

  irOfertas(): void { this.router.navigate(['/ofertas']); }
  irProductos(): void { this.router.navigate(['/productos']); }
}