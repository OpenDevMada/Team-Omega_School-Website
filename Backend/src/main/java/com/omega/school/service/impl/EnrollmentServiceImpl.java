package com.omega.school.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;
import com.omega.school.repository.EnrollmentRepository;
import com.omega.school.service.EnrollmentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    @Override
    public Enrollment enrollStudent(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    @Override
    public List<Enrollment> getEnrollmentsByStudent(UUID studentId) {
        return enrollmentRepository.findByStudentUserId(studentId);
    }

    @Override
    public List<Enrollment> getEnrollmentsByCourse(UUID courseId) {
        return enrollmentRepository.findByCourseCourseId(courseId);
    }

    @Override
    public Enrollment updateEnrollment(EnrollmentId id, Enrollment newData) {
        return enrollmentRepository.findById(id)
                .map(existing -> {
                    existing.setEnrolledAt(newData.getEnrolledAt());
                    return enrollmentRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Inscription non trouvée "));
    }

    @Override
    public void deleteEnrollment(EnrollmentId id) {
        enrollmentRepository.deleteById(id);
    }
}
