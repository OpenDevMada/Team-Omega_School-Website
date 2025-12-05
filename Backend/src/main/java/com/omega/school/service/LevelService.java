package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.omega.school.dto.LevelRequestDto;
import com.omega.school.model.Level;

public interface LevelService {
    Level createLevel(LevelRequestDto dto);

    Optional<Level> getLevelByName(String levelName);

    Page<Level> getAllLevels(int page, int size);

    Level updateLevel(UUID id, LevelRequestDto newLevelName);

    void deleteLevel(UUID id);

    List<Level> getAllLevelsNoPagination();

}
