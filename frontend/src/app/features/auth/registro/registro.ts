import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent {
  fb     = inject(FormBuilder);
  auth   = inject(AuthService);
  router = inject(Router);

  cargando    = signal(false);
  error       = signal('');
  mostrarPass = signal(false);

  form = this.fb.group({
    nombre:    ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando.set(true);
    this.error.set('');

    this.auth.register(this.form.value as any).subscribe({
      next: () => { this.cargando.set(false); this.router.navigate(['/']); },
      error: (e) => {
        this.cargando.set(false);
        this.error.set(e?.error?.message || 'Error al crear la cuenta. Intenta con otro correo.');
      }
    });
  }

  ctrl(name: string): AbstractControl { return this.form.get(name)!; }
}