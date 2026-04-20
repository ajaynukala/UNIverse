package com.example.universe_backend.controller;

import com.example.universe_backend.model.UserSkillProgress;
import com.example.universe_backend.model.UserTaskProgress;
import com.example.universe_backend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @PostMapping("/user/{userId}/skill/{skillId}/start")
    public ResponseEntity<UserSkillProgress> startSkill(@PathVariable Long userId, @PathVariable Long skillId) {
        return ResponseEntity.ok(progressService.startSkill(userId, skillId));
    }

    @DeleteMapping("/user/{userId}/skill/{skillId}/reset")
    public ResponseEntity<Void> resetSkill(@PathVariable Long userId, @PathVariable Long skillId) {
        progressService.resetSkill(userId, skillId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/user/{userId}/task/{taskId}/complete")
    public ResponseEntity<UserTaskProgress> completeTask(@PathVariable Long userId, @PathVariable Long taskId) {
        return ResponseEntity.ok(progressService.completeTask(userId, taskId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserSkillProgress>> getUserProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getUserProgress(userId));
    }

    @GetMapping("/user/{userId}/skill/{skillId}/tasks")
    public ResponseEntity<List<UserTaskProgress>> getUserTaskProgress(@PathVariable Long userId, @PathVariable Long skillId) {
        return ResponseEntity.ok(progressService.getUserTaskProgress(userId, skillId));
    }
}
