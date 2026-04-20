package com.example.universe_backend.repository;

import com.example.universe_backend.model.UserSkillProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserSkillProgressRepository extends JpaRepository<UserSkillProgress, Long> {
    List<UserSkillProgress> findByUserId(Long userId);
    Optional<UserSkillProgress> findFirstByUserIdAndSkillId(Long userId, Long skillId);
}
