package com.omega.school.controller;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.model.Student;
import com.omega.school.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody StudentRequestDto student) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(studentService.createStudent(student));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable UUID id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Étudiant non trouvé"));
    }

    @GetMapping("/registration/{regNumber}")
    public ResponseEntity<Student> getByRegistrationNumber(@PathVariable String regNumber) {
        return studentService.getByRegistrationNumber(regNumber)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Étudiant non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Student>> getByLevel(@PathVariable String level) {
        return ResponseEntity.ok(studentService.getByLevel(level));
    }

    @GetMapping("/group/{group}")
    public ResponseEntity<List<Student>> getByGroup(@PathVariable String group) {
        return ResponseEntity.ok(studentService.getByGroup(group));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable UUID id, @RequestBody StudentRequestDto student) {
        try {
            return ResponseEntity.ok(studentService.updateStudent(id, student));
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
