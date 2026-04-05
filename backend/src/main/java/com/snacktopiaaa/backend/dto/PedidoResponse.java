package com.snacktopiaaa.backend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class PedidoResponse {
    private Long idPedido;
    private String direccion;
    private String distrito;
    private String region;
    private String telefono;
    private LocalDateTime fechaPedido;
    private BigDecimal subtotal;
    private BigDecimal total;
    private String estado;
    private List<DetallePedidoDTO> detalles;
}