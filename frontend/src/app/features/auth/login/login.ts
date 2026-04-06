import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  fb      = inject(FormBuilder);
  auth    = inject(AuthService);
  router  = inject(Router);

  cargando = signal(false);
  error    = signal('');
  mostrarPass = signal(false);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando.set(true);
    this.error.set('');

    this.auth.login(this.form.value as any).subscribe({
      next: () => { this.cargando.set(false); this.router.navigate(['/']); },
      error: (e) => {
        this.cargando.set(false);
        this.error.set(e?.error?.message || 'Email o contraseña incorrectos');
      }
    });
  }

  get emailCtrl()    { return this.form.get('email')!; }
  get passwordCtrl() { return this.form.get('password')!; }
}