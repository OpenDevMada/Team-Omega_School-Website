package com.omega.school.controller;

import com.omega.school.dto.LevelRequestDto;
import com.omega.school.model.Level;
import com.omega.school.service.LevelService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService levelService;

    @PostMapping
    public ResponseEntity<Level> create(@RequestBody LevelRequestDto dto) {
        Level created = levelService.createLevel(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Level> getByName(@PathVariable String name) {
        return levelService.getLevelByName(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé"));
    }

    @GetMapping
    public ResponseEntity<Page<Level>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Level> levels = levelService.getAllLevels(page, size);
        return ResponseEntity.ok(levels);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Level> update(@PathVariable UUID id, @RequestBody LevelRequestDto dto) {
        Level updated = levelService.updateLevel(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        levelService.deleteLevel(id);
        return ResponseEntity.noContent().build();
    }
}
