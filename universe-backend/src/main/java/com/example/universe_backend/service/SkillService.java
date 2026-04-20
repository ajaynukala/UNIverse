package com.example.universe_backend.service;

import com.example.universe_backend.model.Skill;
import com.example.universe_backend.model.Task;
import com.example.universe_backend.model.Certification;
import com.example.universe_backend.model.User;
import com.example.universe_backend.repository.SkillRepository;
import com.example.universe_backend.repository.TaskRepository;
import com.example.universe_backend.repository.CertificationRepository;
import com.example.universe_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CertificationRepository certificationRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> getRecommendedSkills(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Skill> allSkills = skillRepository.findAll();
        
        if (user.getInterests() == null || user.getInterests().isEmpty()) {
            return allSkills; // Default if no interests
        }

        String userKeywords = (user.getInterests() + "," + user.getFieldOfStudy()).toLowerCase();

        return allSkills.stream().sorted((s1, s2) -> {
            int score1 = calculateRelevanceScore(s1.getTags(), userKeywords);
            int score2 = calculateRelevanceScore(s2.getTags(), userKeywords);
            return Integer.compare(score2, score1); // Descending order
        }).collect(Collectors.toList());
    }
    
    private int calculateRelevanceScore(String tags, String userKeywords) {
        if (tags == null || tags.isEmpty()) return 0;
        int score = 0;
        String[] tagArray = tags.toLowerCase().split(",");
        for (String tag : tagArray) {
            if (userKeywords.contains(tag.trim())) {
                score += 10;
            }
        }
        return score;
    }

    public List<Task> getSkillRoadmap(Long skillId) {
        return taskRepository.findBySkillIdOrderByOrderIndexAsc(skillId);
    }
    
    public List<Certification> getCertifications(Long skillId) {
        return certificationRepository.findBySkillId(skillId);
    }
}
