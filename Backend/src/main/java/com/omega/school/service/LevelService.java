package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.omega.school.model.Level;

public interface LevelService {
    Level createLevel(Level level);

    Optional<Level> getLevelByName(String levelName);

    List<Level> getAllLevels();

    Level updateLevel(UUID id, Level newData);

    void deleteLevel(UUID id);
}
