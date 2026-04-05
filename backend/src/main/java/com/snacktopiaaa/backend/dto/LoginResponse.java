package com.snacktopiaaa.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
    private String rol;
}