package com.omega.school.controller;

import com.omega.school.dto.*;
import com.omega.school.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResponseDto> create(@RequestBody CourseRequestDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(courseService.createCourse(dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{title}")
    public ResponseEntity<CourseResponseDto> getByTitle(@PathVariable String title) {
        return ResponseEntity.ok(courseService.getCourseByTitle(title));
    }

    @GetMapping
    public ResponseEntity<List<CourseResponseDto>> getAll() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/teacher/{matricule}")
    public ResponseEntity<List<CourseResponseDto>> getByTeacher(@PathVariable String matricule) {
        return ResponseEntity.ok(courseService.getCoursesByTeacherMatricule(matricule));
    }

    @PutMapping
    public ResponseEntity<CourseResponseDto> update(@RequestBody CourseRequestDto dto) {
        try {
            return ResponseEntity.ok(courseService.updateCourse(dto));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<Void> delete(@PathVariable String title) {
        courseService.deleteCourse(title);
        return ResponseEntity.noContent().build();
    }
}
