package com.snacktopiaaa.backend.repository;

import com.snacktopiaaa.backend.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT p FROM Pedido p WHERE p.usuario.id = :idUsuario ORDER BY p.fechaPedido DESC")
    List<Pedido> findByUsuarioId(@Param("idUsuario") Long idUsuario);
}