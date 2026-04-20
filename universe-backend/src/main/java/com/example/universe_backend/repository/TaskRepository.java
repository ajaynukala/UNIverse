package com.example.universe_backend.repository;

import com.example.universe_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findBySkillIdOrderByOrderIndexAsc(Long skillId);
}
