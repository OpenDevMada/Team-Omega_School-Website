package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.omega.school.dto.LevelRequestDto;
import com.omega.school.model.Level;

public interface LevelService {
    Level createLevel(LevelRequestDto dto);

    Optional<Level> getLevelByName(String levelName);

    List<Level> getAllLevels();

    Level updateLevel(UUID id, LevelRequestDto newLevelName);

    void deleteLevel(UUID id);
}
