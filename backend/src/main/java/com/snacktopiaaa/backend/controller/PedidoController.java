package com.snacktopiaaa.backend.controller;

import com.snacktopiaaa.backend.dto.*;
import com.snacktopiaaa.backend.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    // POST /api/pedidos  → crear pedido (usuario autenticado)
    @PostMapping
    public ResponseEntity<PedidoResponse> crearPedido(
            @Valid @RequestBody PedidoRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {

        PedidoResponse response = pedidoService.crearPedido(req, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    // GET /api/pedidos/mis-pedidos → pedidos del usuario logueado
    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoResponse>> misPedidos(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<PedidoResponse> pedidos = pedidoService
                .obtenerPedidosPorUsuario(userDetails.getUsername());
        return ResponseEntity.ok(pedidos);
    }

    // GET /api/pedidos/{id} → detalle de un pedido
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> detallePedido(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.obtenerPedido(id));
    }
}