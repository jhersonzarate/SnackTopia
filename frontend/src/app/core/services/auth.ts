import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, Usuario } from '../../shared/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'snacktopia_token';
  private readonly USER_KEY  = 'snacktopia_user';

  usuarioActivo = signal<Usuario | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  register(req: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/register`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.usuarioActivo.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    const t = localStorage.getItem(this.TOKEN_KEY);
    return t ? t.trim() : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveSession(res: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token.trim());
    const user: Usuario = { id: res.id, nombre: res.nombre, apellidos: res.apellidos, email: res.email, rol: res.rol };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.usuarioActivo.set(user);
  }

  private loadUser(): Usuario | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}