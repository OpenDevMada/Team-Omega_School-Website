package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.omega.school.model.Student;

public interface StudentService {
    Student createStudent(Student student);

    Optional<Student> getStudentById(UUID id);

    Optional<Student> getByRegistrationNumber(String regNumber);

    List<Student> getAllStudents();

    List<Student> getByLevel(String levelName);

    List<Student> getByGroup(String groupName);

    Student updateStudent(UUID id, Student updatedStudent);

    void deleteStudent(UUID id);
}