package com.omega.school.controller;

import com.omega.school.model.Level;
import com.omega.school.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService levelService;

    @PostMapping
    public ResponseEntity<Level> create(@RequestBody String levelName) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(levelService.createLevel(levelName));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Level> getByName(@PathVariable String name) {
        return levelService.getLevelByName(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Niveau non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Level>> getAll() {
        return ResponseEntity.ok(levelService.getAllLevels());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Level> update(@PathVariable UUID id, @RequestBody String levelName) {
        try {
            return ResponseEntity.ok(levelService.updateLevel(id, levelName));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        levelService.deleteLevel(id);
        return ResponseEntity.noContent().build();
    }
}
