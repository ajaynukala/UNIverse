package com.example.universe_backend.service;

import com.example.universe_backend.model.User;
import com.example.universe_backend.repository.UserRepository;
import com.example.universe_backend.dto.AuthDto;
import com.example.universe_backend.dto.RegisterDto;
import com.example.universe_backend.dto.AuthResponseDto;
import com.example.universe_backend.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponseDto register(RegisterDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setName(dto.getName());
        user.setIsOnboardingCompleted(false);
        user.setCurrentLevel(1);
        user.setPoints(0);
        User savedUser = userRepository.save(user);
        
        String token = jwtUtil.generateToken(savedUser.getEmail());
        return new AuthResponseDto(savedUser, token);
    }

    public AuthResponseDto login(AuthDto dto) {
        Optional<User> userOpt = userRepository.findByEmail(dto.getEmail());
        if (userOpt.isPresent() && passwordEncoder.matches(dto.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            String token = jwtUtil.generateToken(user.getEmail());
            return new AuthResponseDto(user, token);
        }
        throw new RuntimeException("Invalid credentials");
    }
}
