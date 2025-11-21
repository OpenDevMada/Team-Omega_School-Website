package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.omega.school.dto.StudentPartialUpdateDto;
import com.omega.school.dto.StudentRequestDto;
import com.omega.school.dto.StudentUpdateDto;
import com.omega.school.model.Student;

public interface StudentService {
    Student createStudent(StudentRequestDto student);

    Optional<Student> getStudentById(UUID userId);

    Optional<Student> getByRegistrationNumber(String regNumber);

    Page<Student> getAllStudents(int page, int size);

    List<Student> getByLevel(String levelName);

    List<Student> getByGroup(String groupName);

    Student updateStudent(UUID userId, StudentUpdateDto updatedStudent);

    Student partialUpdateStudent(UUID userId, StudentPartialUpdateDto dto);

    void deleteStudent(UUID userId);
}