package com.omega.school.service;

import java.util.List;
import com.omega.school.dto.*;

public interface CourseService {
    CourseResponseDto createCourse(CourseRequestDto dto);

    CourseResponseDto updateCourse(CourseRequestDto dto);

    CourseResponseDto getCourseByTitle(String title);

    List<CourseResponseDto> getAllCourses();

    List<CourseResponseDto> getCoursesByTeacherMatricule(String matricule);

    void deleteCourse(String title);
}
