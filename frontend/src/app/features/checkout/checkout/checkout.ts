import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito';
import { PedidoService } from '../../../core/services/pedido';
import { AuthService } from '../../../core/services/auth';

const REGIONES = [
  'Amazonas','Áncash','Apurímac','Arequipa','Ayacucho','Cajamarca','Callao',
  'Cusco','Huancavelica','Huánuco','Ica','Junín','La Libertad','Lambayeque',
  'Lima (Metropolitana)','Lima (Departamento)','Loreto','Madre de Dios',
  'Moquegua','Pasco','Piura','Puno','San Martín','Tacna','Tumbes','Ucayali'
];

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class CheckoutComponent implements OnInit {
  fb      = inject(FormBuilder);
  carrito = inject(CarritoService);
  pedido  = inject(PedidoService);
  auth    = inject(AuthService);
  router  = inject(Router);

  paso       = signal<1 | 2>(1);
  cargando   = signal(false);
  error      = signal('');
  regiones   = REGIONES;

  form = this.fb.group({
    direccion: ['', Validators.required],
    distrito:  ['', Validators.required],
    region:    ['', Validators.required],
    telefono:  ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
  });

  ngOnInit(): void {
    if (this.carrito.items().length === 0) {
      this.router.navigate(['/']);
    }
    // Prellenar datos del usuario si existen
    const u = this.auth.usuarioActivo();
    if (u) {
      // nombre ya está en el header; aquí sólo campos de dirección
    }
  }

  get subtotal(): number { return this.carrito.totalPrecio(); }

  formatPrecio(n: number): string { return `S/. ${n.toFixed(2)}`; }

  continuarPago(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.paso.set(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  volverInfo(): void { this.paso.set(1); }

  procesarPago(): void {
    this.cargando.set(true);
    this.error.set('');

    const productos = this.carrito.items().map(i => ({
      nombre: i.nombre,
      precioOferta: `S/. ${i.precioFinal.toFixed(2)}`,
      cantidad: i.cantidad
    }));

    const req = {
      direccion: this.form.value.direccion!,
      distrito:  this.form.value.distrito!,
      region:    this.form.value.region!,
      telefono:  this.form.value.telefono!,
      productos
    };

    this.pedido.crear(req).subscribe({
      next: () => {
        this.cargando.set(false);
        this.carrito.vaciar();
        this.router.navigate(['/checkout/confirmacion']);
      },
      error: (e) => {
        this.cargando.set(false);
        this.error.set(e?.error?.message || 'Error al procesar el pedido. Intenta de nuevo.');
        this.paso.set(1);
      }
    });
  }

  ctrl(name: string) { return this.form.get(name)!; }
}