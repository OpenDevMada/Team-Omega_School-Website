package com.omega.school.controller;

import com.omega.school.model.Level;
import com.omega.school.service.LevelService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService levelService;

    @PostMapping
    public ResponseEntity<Level> create(@RequestBody String levelName) {
        Level created = levelService.createLevel(levelName);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Level> getByName(@PathVariable String name) {
        return levelService.getLevelByName(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Level>> getAll() {
        List<Level> levels = levelService.getAllLevels();
        return ResponseEntity.ok(levels);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Level> update(@PathVariable UUID id, @RequestBody String levelName) {
        Level updated = levelService.updateLevel(id, levelName);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        levelService.deleteLevel(id);
        return ResponseEntity.noContent().build();
    }
}
