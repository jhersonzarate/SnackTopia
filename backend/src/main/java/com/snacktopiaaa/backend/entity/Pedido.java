package com.snacktopiaaa.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(length = 200)
    private String direccion;

    @Column(length = 100)
    private String distrito;

    @Column(length = 100)
    private String region;

    @Column(length = 20)
    private String telefono;

    @Column(name = "fecha_pedido")
    @Builder.Default
    private LocalDateTime fechaPedido = LocalDateTime.now();

    @Column(precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(precision = 10, scale = 2)
    private BigDecimal total;

    @Column(length = 30)
    @Builder.Default
    private String estado = "Pagado";

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetallePedido> detalles;
}