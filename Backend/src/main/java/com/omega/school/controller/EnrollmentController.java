package com.omega.school.controller;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.service.EnrollmentService;
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
    public ResponseEntity<EnrollmentResponseDto> enroll(@RequestBody EnrollmentRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(enrollmentService.enrollStudent(dto));
    }

    @GetMapping("/student/{registration}")
    public ResponseEntity<List<EnrollmentResponseDto>> getByStudent(@PathVariable String registration) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudent(registration));
    }

    @GetMapping("/course/{title}")
    public ResponseEntity<List<EnrollmentResponseDto>> getByCourse(@PathVariable String title) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCourse(title));
    }

    @DeleteMapping("/{registration}/{title}")
    public ResponseEntity<Void> delete(
            @PathVariable String registration,
            @PathVariable String title) {
        enrollmentService.deleteEnrollment(registration, title);
        return ResponseEntity.noContent().build();
    }
}
