package com.example.universe_backend.service;

import com.example.universe_backend.model.*;
import com.example.universe_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private UserSkillProgressRepository userSkillProgressRepository;

    @Autowired
    private UserTaskProgressRepository userTaskProgressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private TaskRepository taskRepository;

    public synchronized UserSkillProgress startSkill(Long userId, Long skillId) {
        Optional<UserSkillProgress> existing = userSkillProgressRepository.findFirstByUserIdAndSkillId(userId, skillId);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = userRepository.findById(userId).orElseThrow();
        Skill skill = skillRepository.findById(skillId).orElseThrow();

        UserSkillProgress progress = new UserSkillProgress();
        progress.setUser(user);
        progress.setSkill(skill);
        progress.setStatus("IN_PROGRESS");
        progress.setStartDate(LocalDateTime.now());
        
        // Initialize task progress
        List<Task> tasks = taskRepository.findBySkillIdOrderByOrderIndexAsc(skillId);
        for(Task task : tasks) {
            UserTaskProgress utp = new UserTaskProgress();
            utp.setUser(user);
            utp.setTask(task);
            utp.setIsCompleted(false);
            userTaskProgressRepository.save(utp);
        }

        return userSkillProgressRepository.save(progress);
    }

    public UserTaskProgress completeTask(Long userId, Long taskId) {
        UserTaskProgress utp = userTaskProgressRepository.findFirstByUserIdAndTaskId(userId, taskId)
                .orElseThrow(() -> new RuntimeException("Task progress not found"));
        
        utp.setIsCompleted(true);
        utp.setCompletedAt(LocalDateTime.now());
        userTaskProgressRepository.save(utp);

        // Check if all tasks in skill are done (robust against legacy duplicates)
        Long skillId = utp.getTask().getSkill().getId();
        List<UserTaskProgress> allTasks = userTaskProgressRepository.findByUserIdAndTaskSkillId(userId, skillId);
        
        boolean allCompleted = allTasks.stream()
                .collect(java.util.stream.Collectors.groupingBy(t -> t.getTask().getId()))
                .values().stream()
                .allMatch(list -> list.stream().anyMatch(UserTaskProgress::getIsCompleted));

        if (allCompleted) {
            UserSkillProgress usp = userSkillProgressRepository.findFirstByUserIdAndSkillId(userId, skillId).orElseThrow();
            usp.setStatus("COMPLETED");
            usp.setCompletionDate(LocalDateTime.now());
            userSkillProgressRepository.save(usp);

            // Add points to user and increase level
            User user = userRepository.findById(userId).orElseThrow();
            user.setPoints(user.getPoints() + 100);
            if (user.getPoints() >= 300) user.setCurrentLevel(user.getCurrentLevel() + 1);
            userRepository.save(user);
        }

        return utp;
    }

    public List<UserSkillProgress> getUserProgress(Long userId) {
        return userSkillProgressRepository.findByUserId(userId);
    }

    @jakarta.transaction.Transactional
    public void resetSkill(Long userId, Long skillId) {
        List<UserTaskProgress> tasks = userTaskProgressRepository.findByUserIdAndTaskSkillId(userId, skillId);
        userTaskProgressRepository.deleteAll(tasks);
        
        userSkillProgressRepository.findFirstByUserIdAndSkillId(userId, skillId)
                .ifPresent(usp -> userSkillProgressRepository.delete(usp));
    }

    public List<UserTaskProgress> getUserTaskProgress(Long userId, Long skillId) {
        return userTaskProgressRepository.findByUserIdAndTaskSkillId(userId, skillId);
    }
}
