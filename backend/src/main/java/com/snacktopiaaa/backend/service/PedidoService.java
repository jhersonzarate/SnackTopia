package com.snacktopiaaa.backend.service;

import com.snacktopiaaa.backend.dto.DetallePedidoDTO;
import com.snacktopiaaa.backend.dto.PedidoRequest;
import com.snacktopiaaa.backend.dto.PedidoResponse;
import com.snacktopiaaa.backend.entity.DetallePedido;
import com.snacktopiaaa.backend.entity.Pedido;
import com.snacktopiaaa.backend.entity.Usuario;
import com.snacktopiaaa.backend.repository.PedidoRepository;
import com.snacktopiaaa.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;

    // ── Crear pedido ──────────────────────────────────────────────
    @Transactional
    public PedidoResponse crearPedido(PedidoRequest req, String emailUsuario) {

        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(emailUsuario.trim())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Calcular subtotal parseando "S/. 7.00" → 7.00
        BigDecimal subtotal = req.getProductos().stream()
                .map(p -> parsePrecio(p.getPrecioOferta())
                        .multiply(BigDecimal.valueOf(p.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Pedido pedido = Pedido.builder()
                .usuario(usuario)
                .direccion(req.getDireccion())
                .distrito(req.getDistrito())
                .region(req.getRegion())
                .telefono(req.getTelefono())
                .subtotal(subtotal)
                .total(subtotal)
                .estado("Pagado")
                .build();

        // Construir detalles con for-loop para evitar ambigüedad de tipos en lambda
        List<DetallePedido> detalles = new ArrayList<>();
        for (PedidoRequest.DetalleRequest dr : req.getProductos()) {
            BigDecimal precio = parsePrecio(dr.getPrecioOferta());
            DetallePedido d = DetallePedido.builder()
                    .pedido(pedido)
                    .productoNombre(dr.getNombre())
                    .precioUnitario(precio)
                    .cantidad(dr.getCantidad())
                    .subtotalItem(precio.multiply(BigDecimal.valueOf(dr.getCantidad())))
                    .build();
            detalles.add(d);
        }

        pedido.setDetalles(detalles);
        Pedido guardado = pedidoRepository.save(pedido);
        return toResponse(guardado);
    }

    // ── Listar pedidos de un usuario ──────────────────────────────
    @Transactional(readOnly = true)
    public List<PedidoResponse> obtenerPedidosPorUsuario(String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(emailUsuario.trim())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return pedidoRepository.findByUsuarioId(usuario.getId())
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ── Obtener pedido por ID ─────────────────────────────────────
    @Transactional(readOnly = true)
    public PedidoResponse obtenerPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con id: " + id));
        return toResponse(pedido);
    }

    // ── Helpers ───────────────────────────────────────────────────
    /**
     * Acepta "S/. 7.00", "7,50", "1.234,56", "1.234.567,89" (miles con . o , y decimales al final).
     * No usa un único replace: varios puntos (miles) rompían {@code new BigDecimal}.
     */
    private BigDecimal parsePrecio(String precio) {
        if (precio == null || precio.isBlank()) {
            throw new IllegalArgumentException("Precio vacío");
        }
        String s = precio.trim().replaceAll("[^\\d.,]", "");
        if (s.isEmpty()) {
            throw new IllegalArgumentException("Precio sin dígitos: " + precio);
        }
        int lastDot = s.lastIndexOf('.');
        int lastComma = s.lastIndexOf(',');
        int sep = Math.max(lastDot, lastComma);
        if (sep < 0) {
            return new BigDecimal(s);
        }
        String intPart = s.substring(0, sep).replaceAll("[.,]", "");
        String fracPart = s.substring(sep + 1).replaceAll("[^\\d]", "");
        if (intPart.isEmpty()) {
            intPart = "0";
        }
        if (fracPart.isEmpty()) {
            return new BigDecimal(intPart);
        }
        return new BigDecimal(intPart + "." + fracPart);
    }

    private PedidoResponse toResponse(Pedido p) {
        List<DetallePedidoDTO> dtos = new ArrayList<>();
        if (p.getDetalles() != null) {
            for (DetallePedido d : p.getDetalles()) {
                dtos.add(DetallePedidoDTO.builder()
                        .idDetalle(d.getIdDetalle())
                        .productoNombre(d.getProductoNombre())
                        .precioUnitario(d.getPrecioUnitario())
                        .cantidad(d.getCantidad())
                        .subtotalItem(d.getSubtotalItem())
                        .build());
            }
        }

        return PedidoResponse.builder()
                .idPedido(p.getIdPedido())
                .direccion(p.getDireccion())
                .distrito(p.getDistrito())
                .region(p.getRegion())
                .telefono(p.getTelefono())
                .fechaPedido(p.getFechaPedido())
                .subtotal(p.getSubtotal())
                .total(p.getTotal())
                .estado(p.getEstado())
                .detalles(dtos)
                .build();
    }
}