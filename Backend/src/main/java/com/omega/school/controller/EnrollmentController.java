package com.omega.school.controller;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.model.Student;
import com.omega.school.model.User;
import com.omega.school.service.EnrollmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    public ResponseEntity<EnrollmentResponseDto> enroll(@Valid @RequestBody EnrollmentRequestDto dto) {
        EnrollmentResponseDto created = enrollmentService.enrollStudent(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/student/{registration}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER') or (hasAuthority('STUDENT') and #registration == principal.registrationNumber)")
    public ResponseEntity<Map<String, Object>> getByStudent(
            @PathVariable String registration,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User currentUser) {

        Map<String, Object> response;

        if ("TEACHER".equals(currentUser.getRole().name())) {

            response = enrollmentService.getEnrollmentsByStudentForTeacher(
                    registration, currentUser.getUserId().toString(), page, size);
        } else if ("STUDENT".equals(currentUser.getRole().name())) {

            response = enrollmentService.getEnrollmentsByStudent(registration, page, size);
        } else {

            response = enrollmentService.getEnrollmentsByStudent(registration, page, size);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{title}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER') or hasAuthority('STUDENT')")
    public ResponseEntity<Map<String, Object>> getByCourse(
            @PathVariable String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User currentUser) {

        Map<String, Object> response;

        if ("TEACHER".equals(currentUser.getRole().name())) {
            response = enrollmentService.getEnrollmentsByCourseForTeacher(
                    title, currentUser.getUserId().toString(), page, size);
        } else if ("STUDENT".equals(currentUser.getRole().name())) {

            Student student = (Student) currentUser;
            response = enrollmentService.getEnrollmentsByCourseForStudent(
                    title, student.getRegistrationNumber(), page, size);
        } else {
            response = enrollmentService.getEnrollmentsByCourse(title, page, size);
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{registration}/{title}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> delete(
            @PathVariable String registration,
            @PathVariable String title) {
        enrollmentService.deleteEnrollment(registration, title);
        return ResponseEntity.noContent().build();
    }
}
