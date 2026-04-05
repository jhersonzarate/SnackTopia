package com.snacktopiaaa.backend.service;

import com.snacktopiaaa.backend.dto.LoginRequest;
import com.snacktopiaaa.backend.dto.LoginResponse;
import com.snacktopiaaa.backend.dto.RegisterRequest;
import com.snacktopiaaa.backend.entity.Usuario;
import com.snacktopiaaa.backend.repository.UsuarioRepository;
import com.snacktopiaaa.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    // ── Registro ──────────────────────────────────────────────────
    public LoginResponse register(RegisterRequest req) {
        if (usuarioRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        Usuario usuario = Usuario.builder()
                .nombre(req.getNombre())
                .apellidos(req.getApellidos())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .rol("USER")
                .build();

        Usuario guardado = usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(
                Objects.requireNonNull(guardado.getEmail()),
                Objects.requireNonNull(guardado.getRol()));
        return buildResponse(token, guardado);
    }

    // ── Login ─────────────────────────────────────────────────────
    public LoginResponse login(LoginRequest req) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Email o contraseña incorrectos");
        }

        Usuario usuario = usuarioRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

        String token = jwtUtil.generateToken(
                Objects.requireNonNull(usuario.getEmail()),
                Objects.requireNonNull(usuario.getRol()));
        return buildResponse(token, usuario);
    }

    // ── Helper ────────────────────────────────────────────────────
    private LoginResponse buildResponse(String token, Usuario u) {
        return LoginResponse.builder()
                .token(token)
                .id(u.getId())
                .nombre(u.getNombre())
                .apellidos(u.getApellidos())
                .email(u.getEmail())
                .rol(u.getRol())
                .build();
    }
}