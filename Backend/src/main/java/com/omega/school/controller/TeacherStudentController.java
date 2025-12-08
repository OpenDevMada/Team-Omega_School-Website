package com.omega.school.controller;

import com.omega.school.model.Student;
import com.omega.school.model.Teacher;
import com.omega.school.service.TeacherStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/relations")
@RequiredArgsConstructor
public class TeacherStudentController {

    private final TeacherStudentService teacherStudentService;

    @PreAuthorize("""
                hasAuthority('ADMIN') or
                (hasAuthority('TEACHER') and #teacherId == principal.userId.toString())
            """)
    @GetMapping("/teacher/{teacherId}/students")
    public ResponseEntity<List<Student>> getStudentsOfTeacher(@PathVariable String teacherId) {
        List<Student> students = teacherStudentService.getStudentsOfTeacher(teacherId);
        return ResponseEntity.ok(students);
    }

    @PreAuthorize("""
                hasAuthority('ADMIN') or
                (hasAuthority('STUDENT') and
                    #registration == ((T(com.omega.school.model.Student)) principal).registrationNumber
                )
            """)
    @GetMapping("/student/{registration}/teachers")
    public ResponseEntity<List<Teacher>> getTeachersOfStudent(@PathVariable String registration) {
        List<Teacher> teachers = teacherStudentService.getTeachersOfStudent(registration);
        return ResponseEntity.ok(teachers);
    }
}
