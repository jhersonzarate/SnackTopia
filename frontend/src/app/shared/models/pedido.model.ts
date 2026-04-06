import { DetallePedido } from './detalle-pedido.model';

export interface PedidoRequest {
  direccion: string;
  distrito: string;
  region: string;
  telefono: string;
  productos: {
    nombre: string;
    precioOferta: string;
    cantidad: number;
  }[];
}

export interface PedidoResponse {
  idPedido: number;
  direccion: string;
  distrito: string;
  region: string;
  telefono: string;
  fechaPedido: string;
  subtotal: number;
  total: number;
  estado: string;
  detalles: DetallePedido[];
}