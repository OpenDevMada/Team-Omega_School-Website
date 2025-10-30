package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.omega.school.model.Course;

public interface CourseService {
    List<Course> getAllCourses();

    Optional<Course> getCourseById(UUID id);

    Course createCourse(Course course);

    Course updateCourse(UUID id, Course updatedCourse);

    void deleteCourse(UUID id);

    List<Course> getCoursesByTeacher(UUID teacherId);

}