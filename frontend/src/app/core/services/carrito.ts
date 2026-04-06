import { Injectable, signal, computed } from '@angular/core';
import { CarritoItem } from '../../shared/models/carrito-item.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly STORAGE_KEY = 'snacktopia_carrito';

  items = signal<CarritoItem[]>(this.load());

  totalItems = computed(() => this.items().reduce((s, i) => s + i.cantidad, 0));

  totalPrecio = computed(() =>
    this.items().reduce((s, i) => s + i.precioFinal * i.cantidad, 0)
  );

  agregar(producto: Omit<CarritoItem, 'cantidad'>, cantidad = 1): void {
    this.items.update(items => {
      const existente = items.find(i => i.id === producto.id);
      if (existente) {
        return items.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i);
      }
      return [...items, { ...producto, cantidad }];
    });
    this.save();
  }

  eliminar(id: string): void {
    this.items.update(items => items.filter(i => i.id !== id));
    this.save();
  }

  actualizarCantidad(id: string, cantidad: number): void {
    if (cantidad <= 0) { this.eliminar(id); return; }
    this.items.update(items => items.map(i => i.id === id ? { ...i, cantidad } : i));
    this.save();
  }

  vaciar(): void {
    this.items.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private save(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
  }

  private load(): CarritoItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}