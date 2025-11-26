package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.service.CourseService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
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