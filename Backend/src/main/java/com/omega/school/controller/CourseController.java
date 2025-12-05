package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.model.Student;
import com.omega.school.model.User;
import com.omega.school.service.CourseService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResponseDto> create(@RequestBody CourseRequestDto dto) {
        CourseResponseDto created = courseService.createCourse(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{title}")
    public ResponseEntity<CourseResponseDto> getByTitle(@PathVariable String title) {
        CourseResponseDto course = courseService.getCourseByTitle(title);
        return ResponseEntity.ok(course);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = courseService.getAllCourses(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/teacher/{matricule}")
    public ResponseEntity<Map<String, Object>> getByTeacher(
            @PathVariable String matricule,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Map<String, Object> response = courseService.getCoursesByTeacherMatricule(matricule, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/{registration}")
    @PreAuthorize("hasAuthority('ADMIN') " +
            "or (hasAuthority('TEACHER')) " +
            "or (hasAuthority('STUDENT') and #registration == principal.registrationNumber)")
    public ResponseEntity<Map<String, Object>> getCoursesByStudent(
            @PathVariable String registration,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User currentUser) {

        Map<String, Object> response;

        switch (currentUser.getRole().name()) {

            case "TEACHER":
                response = courseService.getCoursesForStudentForTeacher(
                        registration,
                        currentUser.getUserId().toString(),
                        page,
                        size);
                break;

            case "STUDENT":
                Student student = (Student) currentUser;
                response = courseService.getCoursesForStudent(
                        student.getRegistrationNumber(),
                        page,
                        size);
                break;

            default:
                response = courseService.getCoursesForStudent(
                        registration,
                        page,
                        size);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{title}")
    public ResponseEntity<CourseResponseDto> update(@PathVariable String title, @RequestBody CourseRequestDto dto) {
        CourseResponseDto updated = courseService.updateCourse(title, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<Void> delete(@PathVariable String title) {
        courseService.deleteCourse(title);
        return ResponseEntity.noContent().build();
    }
}