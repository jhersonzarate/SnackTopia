package com.snacktopiaaa.backend.controller;

import com.snacktopiaaa.backend.dto.*;
import com.snacktopiaaa.backend.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

        log.info("📦 POST /api/pedidos - Usuario: {}", 
            userDetails != null ? userDetails.getUsername() : "NULL");
        
        if (userDetails == null) {
            log.error("❌ UserDetails es NULL - Usuario no autenticado");
            return ResponseEntity.status(401).build();
        }

        log.info("📝 Creando pedido para: {}", userDetails.getUsername());
        PedidoResponse response = pedidoService.crearPedido(req, userDetails.getUsername());
        log.info("✅ Pedido creado exitosamente: {}", response.getIdPedido());
        
        return ResponseEntity.ok(response);
    }

    // GET /api/pedidos/mis-pedidos → pedidos del usuario logueado
    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoResponse>> misPedidos(
            @AuthenticationPrincipal UserDetails userDetails) {

        log.info("👤 GET /api/pedidos/mis-pedidos - Usuario: {}", 
            userDetails != null ? userDetails.getUsername() : "NULL");

        List<PedidoResponse> pedidos = pedidoService
                .obtenerPedidosPorUsuario(userDetails.getUsername());
        return ResponseEntity.ok(pedidos);
    }

    // GET /api/pedidos/{id} → detalle de un pedido
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> detallePedido(@PathVariable Long id) {
        log.info("🔍 GET /api/pedidos/{} - Buscando pedido", id);
        return ResponseEntity.ok(pedidoService.obtenerPedido(id));
    }
}