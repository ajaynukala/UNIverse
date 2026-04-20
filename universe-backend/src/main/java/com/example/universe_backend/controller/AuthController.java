package com.example.universe_backend.controller;

import com.example.universe_backend.model.User;
import com.example.universe_backend.dto.AuthDto;
import com.example.universe_backend.dto.RegisterDto;
import com.example.universe_backend.dto.AuthResponseDto;
import com.example.universe_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
        try {
            return ResponseEntity.ok(authService.register(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDto dto) {
        try {
            return ResponseEntity.ok(authService.login(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
