package com.example.universe_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g., Backend, Frontend, DevOps, Database, Cloud, Cyber Security

    @Column(length = 1000)
    private String description;
    
    private String iconUrl;
    
    private String tags; // Comma-separated tags for matching (e.g. "AI,Machine Learning,Python")
}
