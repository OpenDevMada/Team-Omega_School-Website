package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.omega.school.model.Teacher;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher);

    Optional<Teacher> getTeacherById(UUID id);

    Optional<Teacher> getByMatriculeNumber(String matriculeNumber);

    List<Teacher> getAllTeachers();

    Teacher updateTeacher(UUID id, Teacher updatedTeacher);

    void deleteTeacher(UUID id);
}