package com.snacktopiaaa.backend.service;

import com.snacktopiaaa.backend.entity.Usuario;
import com.snacktopiaaa.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // ── Obtener perfil del usuario autenticado ────────────────────
    @Transactional(readOnly = true)
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + email));
    }

    // ── Obtener por ID ────────────────────────────────────────────
    @Transactional(readOnly = true)
    public Usuario obtenerPorId(long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    // ── Listar todos (solo ADMIN) ─────────────────────────────────
    @Transactional(readOnly = true)
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // ── Actualizar nombre y apellidos ─────────────────────────────
    @Transactional
    public Usuario actualizarPerfil(String email, String nuevoNombre, String nuevosApellidos) {
        Usuario usuario = obtenerPorEmail(email);
        usuario.setNombre(nuevoNombre);
        usuario.setApellidos(nuevosApellidos);
        return usuarioRepository.save(usuario);
    }

    // ── Cambiar contraseña ────────────────────────────────────────
    @Transactional
    public void cambiarPassword(String email, String passwordActual, String passwordNuevo) {
        Usuario usuario = obtenerPorEmail(email);

        if (!passwordEncoder.matches(passwordActual, usuario.getPassword())) {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }

        usuario.setPassword(passwordEncoder.encode(passwordNuevo));
        usuarioRepository.save(usuario);
    }

    // ── Eliminar cuenta (solo ADMIN) ──────────────────────────────
    @Transactional
    public void eliminar(long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}