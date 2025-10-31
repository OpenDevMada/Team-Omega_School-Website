package com.omega.school.mapper;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.model.*;

import java.time.LocalDateTime;

public class EnrollmentMapper {

    public static Enrollment toEntity(EnrollmentRequestDto dto, Student student, Course course) {
        Enrollment enrollment = new Enrollment();
        enrollment.setId(new EnrollmentId(student.getUserId(), course.getCourseId()));
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrolledAt(LocalDateTime.now());
        return enrollment;
    }

    public static EnrollmentResponseDto toDto(Enrollment enrollment) {
        return new EnrollmentResponseDto(
                enrollment.getStudent().getRegistrationNumber(),
                enrollment.getCourse().getTitle(),
                enrollment.getEnrolledAt());
    }
}
