package com.example.universe_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String educationLevel;
    private String educationStatus; // e.g. "Pursuing", "Completed"
    private String fieldOfStudy;
    
    // Stored as comma-separated string for simplicity
    private String interests;

    private Boolean isOnboardingCompleted = false;

    private Integer currentLevel = 1;
    private Integer points = 0;
}
