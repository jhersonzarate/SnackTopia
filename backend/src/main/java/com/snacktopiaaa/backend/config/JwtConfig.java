package com.snacktopiaaa.backend.config;

import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

/**
 * JwtConfig centraliza la configuración relacionada con JWT.
 * La lógica de firma/validación vive en JwtUtil;
 * aquí exponemos el SecretKey como Bean reutilizable
 * y documentamos los valores del application.yml.
 */
@Configuration
@Getter
public class JwtConfig {

    // ── Valores inyectados desde application.yml ──────────────────
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;          // milisegundos (86400000 = 24h)

    /**
     * Bean de la clave HMAC-SHA256 derivada del secret configurado.
     * Se inyecta en JwtUtil para firmar y verificar tokens.
     * Requiere mínimo 256 bits (32 caracteres ASCII).
     */
    @Bean
    public SecretKey jwtSecretKey() {
        if (secret == null || secret.length() < 32) {
            throw new IllegalStateException(
                "[JwtConfig] jwt.secret debe tener al menos 32 caracteres. " +
                "Revisa tu application.yml o variable de entorno JWT_SECRET.");
        }
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // ── Constantes de uso interno ─────────────────────────────────
    public static final String HEADER      = "Authorization";
    public static final String PREFIX      = "Bearer ";
    public static final String CLAIM_ROL   = "rol";
    public static final String CLAIM_EMAIL = "sub";
}