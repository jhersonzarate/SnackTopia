package com.snacktopiaaa.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.List;

@Data
public class PedidoRequest {

    @NotBlank private String direccion;
    @NotBlank private String distrito;
    @NotBlank private String region;
    @NotBlank private String telefono;

    @NotEmpty(message = "El pedido debe tener al menos un producto")
    private List<DetalleRequest> productos;

    @Data
    public static class DetalleRequest {
        private String nombre;
        private String precioOferta;   // "S/. 7.00" — se parsea en el servicio
        private Integer cantidad;
    }
}