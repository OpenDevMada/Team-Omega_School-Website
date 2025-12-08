package com.omega.school.controller;

import com.omega.school.model.Student;
import com.omega.school.model.Teacher;
import com.omega.school.model.User;
import com.omega.school.service.TeacherStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relations")
@RequiredArgsConstructor
public class TeacherStudentController {

    private final TeacherStudentService teacherStudentService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    @GetMapping("/teacher/{teacherId}/students")
    public ResponseEntity<List<Student>> getStudentsOfTeacher(
            @PathVariable String teacherId,
            @AuthenticationPrincipal User currentUser) {

        if ("TEACHER".equals(currentUser.getRole().name())
                && !teacherId.equals(currentUser.getUserId().toString())) {
            return ResponseEntity.status(403).build();
        }

        List<Student> students = teacherStudentService.getStudentsOfTeacher(teacherId);
        return ResponseEntity.ok(students);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STUDENT')")
    @GetMapping("/student/{registration}/teachers")
    public ResponseEntity<List<Teacher>> getTeachersOfStudent(
            @PathVariable String registration,
            @AuthenticationPrincipal User currentUser) {

        if ("STUDENT".equals(currentUser.getRole().name())) {
            Student student = (Student) currentUser;
            if (!registration.equals(student.getRegistrationNumber())) {
                return ResponseEntity.status(403).build();
            }
        }

        List<Teacher> teachers = teacherStudentService.getTeachersOfStudent(registration);
        return ResponseEntity.ok(teachers);
    }
}
