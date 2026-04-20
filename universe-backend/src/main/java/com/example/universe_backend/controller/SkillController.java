package com.example.universe_backend.controller;

import com.example.universe_backend.model.Skill;
import com.example.universe_backend.model.Task;
import com.example.universe_backend.model.Certification;
import com.example.universe_backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Skill>> getRecommendedSkills(@RequestParam Long userId) {
        return ResponseEntity.ok(skillService.getRecommendedSkills(userId));
    }

    @GetMapping("/{skillId}/tasks")
    public ResponseEntity<List<Task>> getSkillRoadmap(@PathVariable Long skillId) {
        return ResponseEntity.ok(skillService.getSkillRoadmap(skillId));
    }
    
    @GetMapping("/{skillId}/certifications")
    public ResponseEntity<List<Certification>> getCertifications(@PathVariable Long skillId) {
        return ResponseEntity.ok(skillService.getCertifications(skillId));
    }
}
