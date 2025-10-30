package com.omega.school.service;

import java.util.List;
import java.util.UUID;

import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;

public interface EnrollmentService {
    Enrollment enrollStudent(Enrollment enrollment);

    List<Enrollment> getEnrollmentsByStudent(UUID studentId);

    List<Enrollment> getEnrollmentsByCourse(UUID courseId);

    Enrollment updateEnrollment(EnrollmentId id, Enrollment newData);

    void deleteEnrollment(EnrollmentId id);
}
