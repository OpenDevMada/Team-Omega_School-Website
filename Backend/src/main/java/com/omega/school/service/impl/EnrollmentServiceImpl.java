package com.omega.school.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.omega.school.dto.EnrollmentRequestDto;
import com.omega.school.dto.EnrollmentResponseDto;
import com.omega.school.mapper.EnrollmentMapper;
import com.omega.school.model.*;
import com.omega.school.repository.*;
import com.omega.school.service.EnrollmentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Override
    public EnrollmentResponseDto enrollStudent(EnrollmentRequestDto dto) {
        Student student = studentRepository.findByRegistrationNumber(dto.getStudentRegistration())
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
        Course course = courseRepository.findByTitle(dto.getCourseTitle())
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

        Enrollment enrollment = EnrollmentMapper.toEntity(dto, student, course);
        return EnrollmentMapper.toDto(enrollmentRepository.save(enrollment));
    }

    @Override
    public List<EnrollmentResponseDto> getEnrollmentsByStudent(String registrationNumber) {
        return enrollmentRepository.findByStudentRegistrationNumber(registrationNumber)
                .stream()
                .map(EnrollmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EnrollmentResponseDto> getEnrollmentsByCourse(String title) {
        return enrollmentRepository.findByCourseTitle(title)
                .stream()
                .map(EnrollmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEnrollment(String registrationNumber, String title) {
        Student student = studentRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

        EnrollmentId id = new EnrollmentId(student.getUserId(), course.getCourseId());
        enrollmentRepository.deleteById(id);
    }
}
