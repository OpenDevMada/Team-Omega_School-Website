package com.omega.school.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.omega.school.model.Level;
import com.omega.school.repository.LevelRepository;
import com.omega.school.service.LevelService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {

    private final LevelRepository levelRepository;

    @Override
    public Level createLevel(String levelName) {
        if (levelRepository.existsByLevelName(levelName)) {
            throw new IllegalArgumentException("Nom de niveau déjà utilisé");
        }

        Level level = new Level();
        level.setLevelName(levelName);

        return levelRepository.save(level);
    }

    @Override
    public Optional<Level> getLevelByName(String levelName) {
        return levelRepository.findByLevelName(levelName);
    }

    @Override
    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }

    @Override
    public Level updateLevel(UUID id, String newLevelName) {
        return levelRepository.findById(id)
                .map(existing -> {
                    existing.setLevelName(newLevelName);
                    return levelRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé"));
    }

    @Override
    public void deleteLevel(UUID id) {
        levelRepository.deleteById(id);
    }
}
