package com.omega.school.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {
    List<Enrollment> findByStudentRegistrationNumber(String registrationNumber);

    List<Enrollment> findByCourseTitle(String title);
}
