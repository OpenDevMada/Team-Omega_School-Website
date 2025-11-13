package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.service.GradeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<List<GradeResponseDto>> getByStudent(@PathVariable String registration) {
        List<GradeResponseDto> grades = gradeService.getGradesByStudentRegistration(registration);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<List<GradeResponseDto>> getByCourse(@PathVariable String title) {
        List<GradeResponseDto> grades = gradeService.getGradesByCourseTitle(title);
        return ResponseEntity.ok(grades);
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
