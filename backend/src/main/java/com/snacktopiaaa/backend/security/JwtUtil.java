package com.snacktopiaaa.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email, String rol) {
        String token = Jwts.builder()
                .subject(email)
                .claim("rol", rol)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
        log.info("🎫 Token generado para: {}", email);
        return token;
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public String extractRol(String token) {
        return parseClaims(token).get("rol", String.class);
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = parseClaims(token);
            Date exp = claims.getExpiration();
            Date now = new Date();
            
            if (exp != null && exp.before(now)) {
                log.warn("⏰ Token expirado en: {}", exp);
                return false;
            }
            
            log.debug("✅ Token válido. Expira en: {}", exp);
            return true;
        } catch (MalformedJwtException e) {
            log.error("❌ JWT malformado: {}", e.getMessage());
            return false;
        } catch (SignatureException e) {
            log.error("❌ Firma JWT inválida - Probablemente JWT_SECRET diferente: {}", e.getMessage());
            return false;
        } catch (ExpiredJwtException e) {
            log.error("⏰ JWT expirado: {}", e.getMessage());
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("❌ Error validando JWT: {}", e.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}