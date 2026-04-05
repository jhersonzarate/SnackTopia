export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: string;
  creadoEn?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: string;
}