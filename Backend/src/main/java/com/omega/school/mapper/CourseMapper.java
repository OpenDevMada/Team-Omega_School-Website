package com.omega.school.mapper;

import com.omega.school.dto.*;
import com.omega.school.model.*;
import java.time.LocalDateTime;

public class CourseMapper {

    public static Course toEntity(CourseRequestDto dto, Teacher teacher) {
        Course course = new Course();
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setTeacher(teacher);
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        return course;
    }

    public static CourseResponseDto toDto(Course course) {
        return CourseResponseDto.builder()
                .title(course.getTitle())
                .description(course.getDescription())
                .teacherMatricule(course.getTeacher().getMatriculeNumber())
                .teacherName(course.getTeacher().getFirstName() + " " + course.getTeacher().getLastName())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt())
                .build();
    }
}
