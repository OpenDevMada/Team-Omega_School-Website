package com.omega.school.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {
    Page<Enrollment> findByStudentRegistrationNumber(String registrationNumber, Pageable pageable);

    Page<Enrollment> findByCourseTitle(String title, Pageable pageable);

}
