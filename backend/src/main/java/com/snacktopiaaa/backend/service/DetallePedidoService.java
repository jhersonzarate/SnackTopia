package com.snacktopiaaa.backend.service;

import com.snacktopiaaa.backend.dto.DetallePedidoDTO;
import com.snacktopiaaa.backend.entity.DetallePedido;
import com.snacktopiaaa.backend.repository.DetallePedidoRepository;
import com.snacktopiaaa.backend.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DetallePedidoService {

    private final DetallePedidoRepository detallePedidoRepository;
    private final PedidoRepository pedidoRepository;

    // ── Obtener detalles de un pedido ─────────────────────────────
    @Transactional(readOnly = true)
    public List<DetallePedidoDTO> obtenerPorPedido(long idPedido) {
        pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con id: " + idPedido));

        List<DetallePedido> lista = detallePedidoRepository.findByPedidoIdPedido(idPedido);
        List<DetallePedidoDTO> dtos = new ArrayList<>();
        for (DetallePedido d : lista) {
            dtos.add(toDTO(d));
        }
        return dtos;
    }

    // ── Obtener un detalle específico por su ID ───────────────────
    @Transactional(readOnly = true)
    public DetallePedidoDTO obtenerPorId(long idDetalle) {
        DetallePedido detalle = detallePedidoRepository.findById(idDetalle)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado con id: " + idDetalle));
        return toDTO(detalle);
    }

    // ── Calcular subtotal total de un pedido ──────────────────────
    @Transactional(readOnly = true)
    public BigDecimal calcularTotalPedido(long idPedido) {
        List<DetallePedido> lista = detallePedidoRepository.findByPedidoIdPedido(idPedido);
        BigDecimal total = BigDecimal.ZERO;
        for (DetallePedido d : lista) {
            if (d.getSubtotalItem() != null) {
                total = total.add(d.getSubtotalItem());
            }
        }
        return total;
    }

    // ── Mapper entidad → DTO ──────────────────────────────────────
    private DetallePedidoDTO toDTO(DetallePedido d) {
        return DetallePedidoDTO.builder()
                .idDetalle(d.getIdDetalle())
                .productoNombre(d.getProductoNombre())
                .precioUnitario(d.getPrecioUnitario())
                .cantidad(d.getCantidad())
                .subtotalItem(d.getSubtotalItem())
                .build();
    }
}