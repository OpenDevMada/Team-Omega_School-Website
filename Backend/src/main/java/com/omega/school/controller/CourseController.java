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
    public ResponseEntity<List<CourseResponseDto>> getAll() {
        List<CourseResponseDto> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/teacher/{matricule}")
    public ResponseEntity<List<CourseResponseDto>> getByTeacher(@PathVariable String matricule) {
        List<CourseResponseDto> courses = courseService.getCoursesByTeacherMatricule(matricule);
        return ResponseEntity.ok(courses);
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
