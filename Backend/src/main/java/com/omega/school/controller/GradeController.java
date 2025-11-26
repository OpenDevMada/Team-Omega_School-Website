package com.omega.school.controller;

import com.omega.school.dto.*;

import com.omega.school.model.User;
import com.omega.school.service.GradeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    public ResponseEntity<GradeResponseDto> create(@Valid @RequestBody GradeRequestDto dto) {
        GradeResponseDto created = gradeService.createGrade(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/student/{registration}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER') or hasAuthority('STUDENT')")
    public ResponseEntity<Map<String, Object>> getByStudent(
            @PathVariable String registration,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User currentUser) {

        try {
            Map<String, Object> response = gradeService.getGradesForStudent(registration, currentUser, page, size);
            return ResponseEntity.ok(response);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/course/{title}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    public ResponseEntity<Map<String, Object>> getByCourse(
            @PathVariable String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = gradeService.getGradesByCourseTitle(title, page, size);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    public ResponseEntity<GradeResponseDto> update(@Valid @RequestBody GradeRequestDto dto) {
        GradeResponseDto updated = gradeService.updateGrade(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(@RequestParam String studentRegistration,
            @RequestParam String courseTitle) {
        gradeService.deleteGrade(studentRegistration, courseTitle);
        return ResponseEntity.noContent().build();
    }
}
