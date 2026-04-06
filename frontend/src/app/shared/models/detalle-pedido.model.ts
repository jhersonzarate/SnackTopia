export interface DetallePedido {
  idDetalle?: number;
  productoNombre: string;
  precioUnitario: number;
  cantidad: number;
  subtotalItem: number;
}