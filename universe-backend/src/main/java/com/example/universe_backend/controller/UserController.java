package com.example.universe_backend.controller;

import com.example.universe_backend.model.User;
import com.example.universe_backend.dto.OnboardingDto;
import com.example.universe_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{id}/onboarding")
    public ResponseEntity<User> completeOnboarding(@PathVariable Long id, @RequestBody OnboardingDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEducationLevel(dto.getEducationLevel());
        user.setEducationStatus(dto.getEducationStatus());
        user.setFieldOfStudy(dto.getFieldOfStudy());
        user.setInterests(dto.getInterests());
        user.setIsOnboardingCompleted(true);
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (payload.containsKey("name")) {
            user.setName(payload.get("name"));
        }
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }
}
