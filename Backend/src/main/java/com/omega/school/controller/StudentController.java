package com.omega.school.controller;

import com.omega.school.dto.StudentPartialUpdateDto;
import com.omega.school.dto.StudentRequestDto;
import com.omega.school.dto.StudentUpdateDto;
import com.omega.school.model.Student;
import com.omega.school.service.StudentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody StudentRequestDto student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Student> getById(@PathVariable UUID userId) {
        return studentService.getStudentById(userId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
    }

    @GetMapping("/registration/{regNumber}")
    public ResponseEntity<Student> getByRegistrationNumber(@PathVariable String regNumber) {
        return studentService.getByRegistrationNumber(regNumber)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
    }

    @GetMapping
    public ResponseEntity<Page<Student>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Student> students = studentService.getAllStudents(page, size);
        if (students.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Student>> getByLevel(@PathVariable String level) {
        List<Student> students = studentService.getByLevel(level);
        if (students.isEmpty()) {
            throw new EntityNotFoundException("Aucun étudiant trouvé pour ce niveau");
        }
        return ResponseEntity.ok(students);
    }

    @GetMapping("/group/{group}")
    public ResponseEntity<List<Student>> getByGroup(@PathVariable String group) {
        List<Student> students = studentService.getByGroup(group);
        if (students.isEmpty()) {
            throw new EntityNotFoundException("Aucun étudiant trouvé pour ce groupe");
        }
        return ResponseEntity.ok(students);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Student> update(@PathVariable UUID userId, @RequestBody StudentUpdateDto student) {
        Student updated = studentService.updateStudent(userId, student);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Student> partialUpdate(
            @PathVariable UUID userId,
            @RequestBody StudentPartialUpdateDto dto) {

        Student updated = studentService.partialUpdateStudent(userId, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        studentService.deleteStudent(userId);
        return ResponseEntity.noContent().build();
    }
}
