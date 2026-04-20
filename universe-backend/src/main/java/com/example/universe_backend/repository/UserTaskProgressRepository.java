package com.example.universe_backend.repository;

import com.example.universe_backend.model.UserTaskProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserTaskProgressRepository extends JpaRepository<UserTaskProgress, Long> {
    List<UserTaskProgress> findByUserIdAndTaskSkillId(Long userId, Long skillId);
    Optional<UserTaskProgress> findFirstByUserIdAndTaskId(Long userId, Long taskId);
}
