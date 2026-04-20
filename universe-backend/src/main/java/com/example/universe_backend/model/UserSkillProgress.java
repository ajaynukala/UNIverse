package com.example.universe_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class UserSkillProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    // NOT_STARTED, IN_PROGRESS, COMPLETED
    @Column(nullable = false)
    private String status;

    private LocalDateTime startDate;
    private LocalDateTime completionDate;
}
