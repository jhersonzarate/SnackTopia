import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './restablecer.html',
  styleUrl: './restablecer.scss'
})
export class RestablecerComponent {
  fb = new FormBuilder();

  enviado  = signal(false);
  cargando = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando.set(true);
    setTimeout(() => { this.cargando.set(false); this.enviado.set(true); }, 1200);
  }
}