package com.omega.school.service;

import com.omega.school.dto.*;
import java.util.List;

public interface GradeService {
    GradeResponseDto createGrade(GradeRequestDto dto);

    List<GradeResponseDto> getGradesByStudentRegistration(String registration);

    List<GradeResponseDto> getGradesByCourseTitle(String title);

    GradeResponseDto updateGrade(GradeRequestDto dto);

    void deleteGrade(String studentRegistration, String courseTitle);
}
