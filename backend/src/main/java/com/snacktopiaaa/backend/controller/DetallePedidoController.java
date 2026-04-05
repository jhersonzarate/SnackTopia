package com.snacktopiaaa.backend.controller;

import com.snacktopiaaa.backend.dto.DetallePedidoDTO;
import com.snacktopiaaa.backend.service.DetallePedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/detalle-pedido")
@RequiredArgsConstructor
public class DetallePedidoController {

    private final DetallePedidoService detallePedidoService;

    // GET /api/detalle-pedido/pedido/{idPedido}
    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<List<DetallePedidoDTO>> porPedido(
            @PathVariable long idPedido) {

        return ResponseEntity.ok(
                detallePedidoService.obtenerPorPedido(idPedido));
    }

    // GET /api/detalle-pedido/{idDetalle}
    @GetMapping("/{idDetalle}")
    public ResponseEntity<DetallePedidoDTO> porId(
            @PathVariable long idDetalle) {

        return ResponseEntity.ok(
                detallePedidoService.obtenerPorId(idDetalle));
    }

    // GET /api/detalle-pedido/pedido/{idPedido}/total
    @GetMapping("/pedido/{idPedido}/total")
    public ResponseEntity<Map<String, BigDecimal>> totalPedido(
            @PathVariable long idPedido) {

        BigDecimal total = detallePedidoService.calcularTotalPedido(idPedido);
        return ResponseEntity.ok(Map.of("total", total));
    }
}