import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-libro-reclamaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-reclamaciones.html',
  styleUrl: './libro-reclamaciones.scss'
})
export class LibroReclamacionesComponent {
  fb = new FormBuilder();

  enviado  = signal(false);
  cargando = signal(false);
  nroReclamo = signal('');

  form = this.fb.group({
    nombre:      ['', Validators.required],
    apellidos:   ['', Validators.required],
    tipoDoc:     ['DNI', Validators.required],
    nroDoc:      ['', [Validators.required, Validators.minLength(8)]],
    email:       ['', [Validators.required, Validators.email]],
    telefono:    ['', Validators.required],
    tipoBien:    ['Producto', Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    monto:       [''],
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando.set(true);
    const nro = `SR-${Date.now().toString().slice(-6)}`;
    setTimeout(() => {
      this.cargando.set(false);
      this.nroReclamo.set(nro);
      this.enviado.set(true);
      this.form.reset();
    }, 1400);
  }

  ctrl(n: string) { return this.form.get(n)!; }
}