import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PedidoRequest, PedidoResponse } from '../../shared/models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  constructor(private http: HttpClient) {}

  crear(req: PedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(`${environment.apiUrl}/pedidos`, req);
  }

  misPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${environment.apiUrl}/pedidos/mis-pedidos`);
  }

  getById(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${environment.apiUrl}/pedidos/${id}`);
  }
}