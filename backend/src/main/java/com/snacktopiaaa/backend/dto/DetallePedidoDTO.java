package com.snacktopiaaa.backend.dto;

import lombok.*;
import java.math.BigDecimal;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DetallePedidoDTO {
    private Long idDetalle;
    private String productoNombre;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotalItem;
}