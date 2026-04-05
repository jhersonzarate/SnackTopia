package com.snacktopiaaa.backend.controller;

import com.snacktopiaaa.backend.entity.Usuario;
import com.snacktopiaaa.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // GET /api/usuarios/perfil → datos del usuario autenticado
    @GetMapping("/perfil")
    public ResponseEntity<Map<String, Object>> perfil(
            @AuthenticationPrincipal UserDetails userDetails) {

        Usuario u = usuarioService.obtenerPorEmail(userDetails.getUsername());

        // Nunca devolvemos el password al frontend
        return ResponseEntity.ok(Map.of(
                "id",        u.getId(),
                "nombre",    u.getNombre(),
                "apellidos", u.getApellidos(),
                "email",     u.getEmail(),
                "rol",       u.getRol(),
                "creadoEn",  u.getCreadoEn()
        ));
    }

    // PUT /api/usuarios/perfil → actualizar nombre y apellidos
    @PutMapping("/perfil")
    public ResponseEntity<Map<String, String>> actualizarPerfil(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {

        String nombre    = body.get("nombre");
        String apellidos = body.get("apellidos");

        if (nombre == null || nombre.isBlank() ||
            apellidos == null || apellidos.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Nombre y apellidos son requeridos"));
        }

        usuarioService.actualizarPerfil(userDetails.getUsername(), nombre, apellidos);
        return ResponseEntity.ok(Map.of("mensaje", "Perfil actualizado correctamente"));
    }

    // PUT /api/usuarios/cambiar-password → cambio de contraseña
    @PutMapping("/cambiar-password")
    public ResponseEntity<Map<String, String>> cambiarPassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> body) {

        String actual = body.get("passwordActual");
        String nuevo  = body.get("passwordNuevo");

        if (actual == null || nuevo == null || nuevo.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "La nueva contraseña debe tener al menos 6 caracteres"));
        }

        usuarioService.cambiarPassword(userDetails.getUsername(), actual, nuevo);
        return ResponseEntity.ok(Map.of("mensaje", "Contraseña actualizada correctamente"));
    }

    // GET /api/admin/usuarios → lista todos (solo ADMIN)
    @GetMapping("/admin/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // DELETE /api/usuarios/admin/{id} → eliminar usuario (solo ADMIN)
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario eliminado correctamente"));
    }
}