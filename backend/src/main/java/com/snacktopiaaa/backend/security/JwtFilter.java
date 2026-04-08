package com.snacktopiaaa.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String requestPath = request.getRequestURI();

        if (authHeader != null && authHeader.length() > 7
                && authHeader.regionMatches(true, 0, "Bearer ", 0, 7)) {
            String token = authHeader.substring(7).trim();
            log.info("🔐 JWT Token recibido para: {}", requestPath);

            try {
                if (jwtUtil.isTokenValid(token)) {
                    String email = jwtUtil.extractEmail(token).trim();
                    log.info("✅ Token válido para usuario: {}", email);
                    
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    log.info("👤 Usuario cargado con roles: {}", userDetails.getAuthorities());

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    log.info("🔓 Autenticación asignada al contexto");
                } else {
                    log.warn("❌ Token inválido para: {}", requestPath);
                }
            } catch (Exception e) {
                log.error("⚠️ Error procesando JWT: {}", e.getMessage(), e);
            }
        } else {
            log.debug("ℹ️ Sin token JWT en request: {}", requestPath);
        }

        filterChain.doFilter(request, response);
    }
}