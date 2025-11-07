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
            Student created = studentService.createStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la création de l’étudiant");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Student> getById(@PathVariable UUID userId) {
        return studentService.getStudentById(
                userId)
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
        List<Student> students = studentService.getAllStudents();
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(students);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<Student>> getByLevel(@PathVariable String level) {
        List<Student> students = studentService.getByLevel(level);
        if (students.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun étudiant trouvé pour ce niveau");
        }
        return ResponseEntity.ok(students);
    }

    @GetMapping("/group/{group}")
    public ResponseEntity<List<Student>> getByGroup(@PathVariable String group) {
        List<Student> students = studentService.getByGroup(group);
        if (students.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun étudiant trouvé pour ce groupe");
        }
        return ResponseEntity.ok(students);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Student> update(@PathVariable UUID userId, @RequestBody StudentRequestDto student) {
        try {
            Student updated = studentService.updateStudent(userId, student);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la mise à jour de l’étudiant");
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        try {
            studentService.deleteStudent(userId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Étudiant non trouvé");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la suppression de l’étudiant");
        }
    }
}
