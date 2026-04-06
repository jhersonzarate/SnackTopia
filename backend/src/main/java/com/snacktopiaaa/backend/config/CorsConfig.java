package com.snacktopiaaa.backend.config;

import org.springframework.context.annotation.Configuration;

// Esta clase ya no define el CorsFilter porque
// el CORS ahora lo maneja SecurityConfig via CorsConfigurationSource
@Configuration
public class CorsConfig {
    // Vacío intencionalmente
}