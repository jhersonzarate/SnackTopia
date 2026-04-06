import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoCardComponent } from '../../../shared/components/producto-card/producto-card';
import { ProductoService } from '../../../core/services/producto';
import { CarritoService } from '../../../core/services/carrito';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoCardComponent],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.scss'
})
export class ListaProductosComponent implements OnInit {
  prodSvc  = inject(ProductoService);
  carrito  = inject(CarritoService);
  router   = inject(Router);
  route    = inject(ActivatedRoute);

  todosLosProductos: Producto[] = [];
  productosFiltrados = signal<Producto[]>([]);
  textoBusqueda = signal('');
  categoriaActiva = signal<string>('todos');
  marcaActiva = signal<string>('');
  sinResultados = signal(false);

  readonly categorias = [
    { id: 'todos',         label: 'Todos' },
    { id: 'snacks-salados', label: 'Snacks Salados' },
    { id: 'galletas',      label: 'Galletas' },
    { id: 'dulces',        label: 'Dulces' },
  ];

  ngOnInit(): void {
    this.todosLosProductos = this.prodSvc.getAll().filter(p => p.categoria !== 'ofertas');
    this.route.queryParams.subscribe(params => {
      const marca = params['marca'] || '';
      const cat   = params['categoria'] || 'todos';
      this.marcaActiva.set(marca);
      this.categoriaActiva.set(cat);
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    let lista = [...this.todosLosProductos];
    const q    = this.textoBusqueda().toLowerCase().trim();
    const cat  = this.categoriaActiva();
    const marca = this.marcaActiva();

    if (cat && cat !== 'todos') {
      lista = lista.filter(p => p.categoria === cat);
    }
    if (marca) {
      lista = lista.filter(p => p.marca === marca);
    }
    if (q) {
      lista = lista.filter(p => p.nombre.toLowerCase().includes(q));
    }
    this.productosFiltrados.set(lista);
    this.sinResultados.set(lista.length === 0);
  }

  onCategoria(id: string): void {
    this.categoriaActiva.set(id);
    this.marcaActiva.set('');
    this.aplicarFiltros();
  }

  onBuscar(texto: string): void {
    this.textoBusqueda.set(texto);
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.textoBusqueda.set('');
    this.categoriaActiva.set('todos');
    this.marcaActiva.set('');
    this.aplicarFiltros();
  }

  verDetalle(id: string): void {
    this.router.navigate(['/productos', id]);
  }

  agregar(p: Producto): void {
    this.carrito.agregar({
      id: p.id, nombre: p.nombre, imagen: p.imagen,
      precioOriginal: p.precioOriginal, precioFinal: p.precioFinal
    });
  }
}