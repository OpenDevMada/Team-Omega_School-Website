package com.omega.school.service;

import java.util.List;
import java.util.Map;

import com.omega.school.dto.*;
import com.omega.school.model.Course;

public interface CourseService {
    CourseResponseDto createCourse(CourseRequestDto dto);

    CourseResponseDto updateCourse(String title, CourseRequestDto dto);

    CourseResponseDto getCourseByTitle(String title);

    Map<String, Object> getAllCourses(int page, int size);

    Map<String, Object> getCoursesByTeacherMatricule(String matricule, int page, int size);

    Map<String, Object> getCoursesForStudent(String registration, int page, int size);

    Map<String, Object> getCoursesForStudentForTeacher(
            String studentRegistration,
            String teacherId,
            int page,
            int size);

    void deleteCourse(String title);

    List<Course> getAllCoursesNoPagination();
}