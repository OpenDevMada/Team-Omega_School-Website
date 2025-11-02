package com.omega.school.service;

import java.util.List;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;

public interface EnrollmentService {
    EnrollmentResponseDto enrollStudent(EnrollmentRequestDto dto);

    List<EnrollmentResponseDto> getEnrollmentsByStudent(String registrationNumber);

    List<EnrollmentResponseDto> getEnrollmentsByCourse(String title);

    void deleteEnrollment(String registrationNumber, String title);
}
