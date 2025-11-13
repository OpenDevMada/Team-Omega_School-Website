package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.model.Teacher;

public interface TeacherService {
    Teacher createTeacher(TeacherRequestDto teacherDto);

    Optional<Teacher> getTeacherById(UUID userId);

    Optional<Teacher> getByMatriculeNumber(String matriculeNumber);

    List<Teacher> getAllTeachers();

    Teacher updateTeacher(UUID userId, TeacherUpdateDto updatedTeacherDto);

    void deleteTeacher(UUID userId);
}
