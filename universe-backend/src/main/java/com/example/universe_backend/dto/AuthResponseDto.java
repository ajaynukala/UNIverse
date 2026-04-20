package com.example.universe_backend.dto;

import com.example.universe_backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private User user;
    private String token;
}
