import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoCardComponent } from '../../../shared/components/producto-card/producto-card';
import { ProductoService } from '../../../core/services/producto';
import { CarritoService } from '../../../core/services/carrito';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.scss'
})
export class OfertasComponent {
  prodSvc = inject(ProductoService);
  carrito = inject(CarritoService);
  router  = inject(Router);

  ofertas = this.prodSvc.getOfertas();

  verDetalle(id: string): void { this.router.navigate(['/productos', id]); }

  agregar(p: Producto): void {
    this.carrito.agregar({
      id: p.id, nombre: p.nombre, imagen: p.imagen,
      precioOriginal: p.precioOriginal, precioFinal: p.precioFinal
    });
  }
}