package com.omega.school.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.omega.school.dto.TeacherPartialUpdateDto;
import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.model.Teacher;

public interface TeacherService {
    Teacher createTeacher(TeacherRequestDto teacherDto);

    Optional<Teacher> getTeacherById(UUID userId);

    Optional<Teacher> getByMatriculeNumber(String matriculeNumber);

    Page<Teacher> getAllTeachers(int page, int size);

    Teacher updateTeacher(UUID userId, TeacherUpdateDto updatedTeacherDto);

    Teacher partialUpdateTeacher(UUID id, TeacherPartialUpdateDto dto);

    void deleteTeacher(UUID userId);

    Optional<Teacher> getByEmail(String email);
}
