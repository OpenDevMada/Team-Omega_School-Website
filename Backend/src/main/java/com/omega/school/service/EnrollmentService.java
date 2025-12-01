package com.omega.school.service;

import java.util.Map;
import java.util.UUID;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;

public interface EnrollmentService {
        EnrollmentResponseDto enrollStudent(EnrollmentRequestDto dto);

        Map<String, Object> getEnrollmentsByStudent(String registrationNumber, int page, int size);

        Map<String, Object> getEnrollmentsByStudentForTeacher(String registrationNumber,
                        UUID teacherId,
                        int page, int size);

        Map<String, Object> getEnrollmentsByCourseForTeacher(String title,
                        UUID teacherId, int page,
                        int size);

        Map<String, Object> getEnrollmentsByCourse(String title, int page, int size);

        void deleteEnrollment(String registrationNumber, String title);

        Map<String, Object> getEnrollmentsByCourseForStudent(String title, String studentRegistration, int page,
                        int size);
}
