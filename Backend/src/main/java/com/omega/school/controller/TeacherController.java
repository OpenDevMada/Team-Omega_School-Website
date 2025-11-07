package com.omega.school.controller;

import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.model.Teacher;
import com.omega.school.service.TeacherService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping
    public ResponseEntity<Teacher> create(@Valid @RequestBody TeacherRequestDto dto) {
        try {
            Teacher created = teacherService.createTeacher(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la création de l’enseignant");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Teacher> getById(@PathVariable UUID userId) {
        return teacherService.getTeacherById(
                userId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Enseignant non trouvé"));
    }

    @GetMapping("/matricule/{matricule}")
    public ResponseEntity<Teacher> getByMatricule(@PathVariable String matricule) {
        return teacherService.getByMatriculeNumber(matricule)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Enseignant non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAll() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        if (teachers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(teachers);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Teacher> update(@PathVariable UUID userId, @Valid @RequestBody TeacherRequestDto teacher) {
        try {
            Teacher updated = teacherService.updateTeacher(userId, teacher);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la mise à jour de l’enseignant");
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        try {
            teacherService.deleteTeacher(userId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enseignant non trouvé");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la suppression de l’enseignant");
        }
    }
}
