package com.example.universe_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;
    
    private String platform;
}
