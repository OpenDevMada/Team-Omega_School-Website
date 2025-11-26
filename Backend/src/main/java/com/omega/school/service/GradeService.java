package com.omega.school.service;

import com.omega.school.dto.*;
import com.omega.school.model.User;

import java.util.Map;

public interface GradeService {
    GradeResponseDto createGrade(GradeRequestDto dto);

    Map<String, Object> getGradesByStudentRegistration(String registration, int page, int size);

    Map<String, Object> getGradesByCourseTitle(String title, int page, int size);

    Map<String, Object> getGradesByStudentForTeacher(String studentRegistration, String teacherId, int page, int size);

    GradeResponseDto updateGrade(GradeRequestDto dto);

    void deleteGrade(String studentRegistration, String courseTitle);

    Map<String, Object> getGradesForStudent(String registration, User currentUser, int page, int size);

}
