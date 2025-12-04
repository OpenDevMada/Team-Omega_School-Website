package com.omega.school.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.omega.school.dto.LevelRequestDto;
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
    public Level createLevel(LevelRequestDto dto) {
        if (levelRepository.existsByName(dto.getLevelName())) {
            throw new IllegalArgumentException("Nom de niveau déjà utilisé");
        }
        if (dto.getLevelName() == null || dto.getLevelName().isBlank()) {
            throw new IllegalArgumentException("Le nom du niveau ne peut pas être vide");
        }

        Level level = new Level();
        level.setName(dto.getLevelName());

        return levelRepository.save(level);
    }

    @Override
    public Optional<Level> getLevelByName(String name) {
        return levelRepository.findByName(name);
    }

    @Override
    public Page<Level> getAllLevels(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return levelRepository.findAll(pageable);
    }

    @Override
    public Level updateLevel(UUID id, LevelRequestDto dto) {
        return levelRepository.findById(id)
                .map(existing -> {
                    existing.setName(dto.getLevelName());
                    return levelRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé"));
    }

    @Override
    public void deleteLevel(UUID id) {
        if (!levelRepository.existsById(id)) {
            throw new EntityNotFoundException("Niveau non trouvé");
        }
        levelRepository.deleteById(id);
    }

    @Override
    public List<Level> getAllLevelsNoPagination() {
        return levelRepository.findAll();
    }

}
