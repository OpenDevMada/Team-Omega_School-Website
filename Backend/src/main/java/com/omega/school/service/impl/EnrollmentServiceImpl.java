package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
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

                EnrollmentId id = new EnrollmentId(student.getUserId(), course.getCourseId());
                if (enrollmentRepository.existsById(id)) {
                        throw new IllegalArgumentException("L'étudiant est déjà inscrit à ce cours");
                }

                Enrollment enrollment = EnrollmentMapper.toEntity(dto, student, course);

                enrollment.setEnrolledAt(LocalDateTime.now());

                return EnrollmentMapper.toDto(enrollmentRepository.save(enrollment));
        }

        @Override
        public Map<String, Object> getEnrollmentsByStudent(String registrationNumber, int page, int size) {
                Pageable pageable = PageRequest.of(page, size);

                Page<Enrollment> enrollmentPage = enrollmentRepository
                                .findByStudentRegistrationNumber(registrationNumber, pageable);

                List<EnrollmentResponseDto> content = enrollmentPage.getContent()
                                .stream()
                                .map(EnrollmentMapper::toDto)
                                .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", enrollmentPage.getNumber());
                response.put("totalItems", enrollmentPage.getTotalElements());
                response.put("totalPages", enrollmentPage.getTotalPages());

                return response;
        }

        @Override
        public Map<String, Object> getEnrollmentsByStudentForTeacher(String registrationNumber, String teacherId,
                        int page, int size) {
                Pageable pageable = PageRequest.of(page, size);
                Page<Enrollment> enrollmentPage = enrollmentRepository
                                .findByStudentRegistrationAndTeacherId(registrationNumber, teacherId, pageable);
                List<EnrollmentResponseDto> content = enrollmentPage.getContent().stream().map(EnrollmentMapper::toDto)
                                .collect(Collectors.toList());
                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", enrollmentPage.getNumber());
                response.put("totalItems", enrollmentPage.getTotalElements());
                response.put("totalPages", enrollmentPage.getTotalPages());
                return response;
        }

        @Override
        public Map<String, Object> getEnrollmentsByCourse(String title, int page, int size) {
                Pageable pageable = PageRequest.of(page, size);

                Page<Enrollment> enrollmentPage = enrollmentRepository.findByCourseTitle(title, pageable);

                List<EnrollmentResponseDto> content = enrollmentPage.getContent()
                                .stream()
                                .map(EnrollmentMapper::toDto)
                                .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", enrollmentPage.getNumber());
                response.put("totalItems", enrollmentPage.getTotalElements());
                response.put("totalPages", enrollmentPage.getTotalPages());

                return response;
        }

        @Override
        public Map<String, Object> getEnrollmentsByCourseForTeacher(String title, String teacherId, int page,
                        int size) {
                Pageable pageable = PageRequest.of(page, size);
                Page<Enrollment> enrollmentPage = enrollmentRepository.findByCourseTitleAndTeacherId(title, teacherId,
                                pageable);
                List<EnrollmentResponseDto> content = enrollmentPage.getContent().stream().map(EnrollmentMapper::toDto)
                                .collect(Collectors.toList());
                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", enrollmentPage.getNumber());
                response.put("totalItems", enrollmentPage.getTotalElements());
                response.put("totalPages", enrollmentPage.getTotalPages());
                return response;
        }

        @Override
        public void deleteEnrollment(String registrationNumber, String title) {
                Student student = studentRepository.findByRegistrationNumber(registrationNumber)
                                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
                Course course = courseRepository.findByTitle(title)
                                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

                EnrollmentId id = new EnrollmentId(student.getUserId(), course.getCourseId());

                if (!enrollmentRepository.existsById(id)) {
                        throw new EntityNotFoundException("Inscription non trouvée");
                }

                enrollmentRepository.deleteById(id);
        }

        @Override
        public Map<String, Object> getEnrollmentsByCourseForStudent(String title, String studentRegistration, int page,
                        int size) {
                Pageable pageable = PageRequest.of(page, size);

                Page<Enrollment> enrollmentPage = enrollmentRepository.findByCourseTitleAndStudentRegistration(title,
                                studentRegistration, pageable);

                List<EnrollmentResponseDto> content = enrollmentPage.getContent().stream()
                                .map(EnrollmentMapper::toDto)
                                .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", enrollmentPage.getNumber());
                response.put("totalItems", enrollmentPage.getTotalElements());
                response.put("totalPages", enrollmentPage.getTotalPages());

                return response;
        }

}
