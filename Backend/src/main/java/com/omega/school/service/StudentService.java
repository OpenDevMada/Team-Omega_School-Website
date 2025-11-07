package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.model.Student;

public interface StudentService {
    Student createStudent(StudentRequestDto student);

    Optional<Student> getStudentById(UUID userId);

    Optional<Student> getByRegistrationNumber(String regNumber);

    List<Student> getAllStudents();

    List<Student> getByLevel(String levelName);

    List<Student> getByGroup(String groupName);

    Student updateStudent(UUID userId, StudentRequestDto updatedStudent);

    void deleteStudent(UUID userId);
}