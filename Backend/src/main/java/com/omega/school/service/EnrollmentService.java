package com.omega.school.service;

import java.util.Map;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;

public interface EnrollmentService {
    EnrollmentResponseDto enrollStudent(EnrollmentRequestDto dto);

    Map<String, Object> getEnrollmentsByStudent(String registrationNumber, int page, int size);

    Map<String, Object> getEnrollmentsByCourse(String title, int page, int size);

    void deleteEnrollment(String registrationNumber, String title);
}
