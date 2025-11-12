package com.omega.school.controller;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.service.EnrollmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<List<EnrollmentResponseDto>> getByStudent(@PathVariable String registration) {
        List<EnrollmentResponseDto> enrollments = enrollmentService.getEnrollmentsByStudent(registration);
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<List<EnrollmentResponseDto>> getByCourse(@PathVariable String title) {
        List<EnrollmentResponseDto> enrollments = enrollmentService.getEnrollmentsByCourse(title);
        return ResponseEntity.ok(enrollments);
    }

    @DeleteMapping("/{registration}/{title}")
    public ResponseEntity<Void> delete(
            @PathVariable String registration,
            @PathVariable String title) {
        enrollmentService.deleteEnrollment(registration, title);
        return ResponseEntity.noContent().build();
    }
}
