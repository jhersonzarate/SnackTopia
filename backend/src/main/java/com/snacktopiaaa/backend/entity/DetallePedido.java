package com.snacktopiaaa.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "detalle_pedido")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @Column(name = "producto_nombre", length = 150)
    private String productoNombre;

    @Column(name = "precio_unitario", precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    private Integer cantidad;

    @Column(name = "subtotal_item", precision = 10, scale = 2)
    private BigDecimal subtotalItem;
}