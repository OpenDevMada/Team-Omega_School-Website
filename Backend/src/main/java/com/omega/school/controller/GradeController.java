package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.service.GradeService;
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
    public ResponseEntity<GradeResponseDto> create(@RequestBody GradeRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gradeService.createGrade(dto));
    }

    @GetMapping("/student/{registration}")
    public ResponseEntity<List<GradeResponseDto>> getByStudent(@PathVariable String registration) {
        return ResponseEntity.ok(gradeService.getGradesByStudentRegistration(registration));
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<List<GradeResponseDto>> getByCourse(@PathVariable String title) {
        return ResponseEntity.ok(gradeService.getGradesByCourseTitle(title));
    }

    @PutMapping
    public ResponseEntity<GradeResponseDto> update(@RequestBody GradeRequestDto dto) {
        return ResponseEntity.ok(gradeService.updateGrade(dto));
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam String studentRegistration,
            @RequestParam String courseTitle) {
        gradeService.deleteGrade(studentRegistration, courseTitle);
        return ResponseEntity.noContent().build();
    }
}
