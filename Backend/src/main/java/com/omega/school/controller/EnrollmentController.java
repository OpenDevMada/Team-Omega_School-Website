package com.omega.school.controller;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.service.EnrollmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<EnrollmentResponseDto> enroll(@Valid @RequestBody EnrollmentRequestDto dto) {
        EnrollmentResponseDto created = enrollmentService.enrollStudent(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/student/{registration}")
    public ResponseEntity<Map<String, Object>> getByStudent(
            @PathVariable String registration,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = enrollmentService.getEnrollmentsByStudent(registration, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<Map<String, Object>> getByCourse(
            @PathVariable String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = enrollmentService.getEnrollmentsByCourse(title, page, size);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{registration}/{title}")
    public ResponseEntity<Void> delete(
            @PathVariable String registration,
            @PathVariable String title) {
        enrollmentService.deleteEnrollment(registration, title);
        return ResponseEntity.noContent().build();
    }
}
