package com.omega.school.mapper;

import com.omega.school.dto.*;
import com.omega.school.model.*;

public class GradeMapper {

    public static Grade toEntity(GradeRequestDto dto, Student student, Course course) {
        Grade grade = new Grade();
        GradeId id = new GradeId();
        id.setStudentId(student.getUserId());
        id.setCourseId(course.getCourseId());

        grade.setId(id);
        grade.setStudent(student);
        grade.setCourse(course);
        grade.setValue(dto.getValue());
        grade.setComment(dto.getComment());
        return grade;
    }

    public static GradeResponseDto toDto(Grade grade) {
        return GradeResponseDto.builder()
                .studentRegistration(grade.getStudent().getRegistrationNumber())
                .courseTitle(grade.getCourse().getTitle())
                .value(grade.getValue())
                .comment(grade.getComment())
                .createdAt(grade.getCreatedAt())
                .updatedAt(grade.getUpdatedAt())
                .build();
    }
}
