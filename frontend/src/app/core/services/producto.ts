import { Injectable } from '@angular/core';
import { Producto, PRODUCTOS } from '../../shared/models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  getAll(): Producto[] {
    return PRODUCTOS;
  }

  getById(id: string): Producto | undefined {
    return PRODUCTOS.find(p => p.id === id);
  }

  getByCategoria(categoria: Producto['categoria']): Producto[] {
    return PRODUCTOS.filter(p => p.categoria === categoria);
  }

  getByMarca(marca: string): Producto[] {
    return PRODUCTOS.filter(p => p.marca === marca);
  }

  buscar(texto: string): Producto[] {
    const q = texto.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTOS.filter(p => p.nombre.toLowerCase().includes(q));
  }

  getOfertas(): Producto[] {
    return PRODUCTOS.filter(p => p.categoria === 'ofertas');
  }
}