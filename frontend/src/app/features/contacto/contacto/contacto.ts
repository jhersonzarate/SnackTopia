import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class ContactoComponent {
  fb = new FormBuilder();

  enviado  = signal(false);
  cargando = signal(false);

  form = this.fb.group({
    nombre:  ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    asunto:  ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando.set(true);
    // Simulación de envío
    setTimeout(() => {
      this.cargando.set(false);
      this.enviado.set(true);
      this.form.reset();
    }, 1200);
  }

  ctrl(n: string) { return this.form.get(n)!; }
}