package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.service.GradeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    public ResponseEntity<GradeResponseDto> create(@Valid @RequestBody GradeRequestDto dto) {
        GradeResponseDto created = gradeService.createGrade(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/student/{registration}")
    public ResponseEntity<Map<String, Object>> getByStudent(
            @PathVariable String registration,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = gradeService.getGradesByStudentRegistration(registration, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<Map<String, Object>> getByCourse(
            @PathVariable String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = gradeService.getGradesByCourseTitle(title, page, size);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<GradeResponseDto> update(@Valid @RequestBody GradeRequestDto dto) {
        GradeResponseDto updated = gradeService.updateGrade(dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam String studentRegistration,
            @RequestParam String courseTitle) {
        gradeService.deleteGrade(studentRegistration, courseTitle);
        return ResponseEntity.noContent().build();
    }
}
