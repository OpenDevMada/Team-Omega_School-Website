package com.omega.school.controller;

import com.omega.school.dto.TeacherPartialUpdateDto;
import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.model.Teacher;
import com.omega.school.service.TeacherService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<Teacher> create(@Valid @RequestBody TeacherRequestDto dto) {
        Teacher created = teacherService.createTeacher(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{userId}")
    public ResponseEntity<Teacher> getById(@PathVariable UUID userId) {
        return teacherService.getTeacherById(userId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/matricule/{matricule}")
    public ResponseEntity<Teacher> getByMatricule(@PathVariable String matricule) {
        return teacherService.getByMatriculeNumber(matricule)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<Teacher>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Teacher> teachers = teacherService.getAllTeachers(page, size);

        if (teachers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(teachers);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{userId}")
    public ResponseEntity<Teacher> update(@PathVariable UUID userId, @Valid @RequestBody TeacherUpdateDto teacher) {
        Teacher updated = teacherService.updateTeacher(userId, teacher);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/{userId}")
    public ResponseEntity<Teacher> partialUpdate(
            @PathVariable UUID userId,
            @RequestBody TeacherPartialUpdateDto dto) {

        Teacher updated = teacherService.partialUpdateTeacher(userId, dto);
        return ResponseEntity.ok(updated);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        teacherService.deleteTeacher(userId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('TEACHER')")
    @GetMapping("/me")
    public ResponseEntity<Teacher> getMyProfile() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return teacherService.getByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
