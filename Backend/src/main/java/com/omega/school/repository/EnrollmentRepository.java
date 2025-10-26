package com.omega.school.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {

    List<Enrollment> findByStudent_UserId(UUID studentId);

    List<Enrollment> findByCourse_CourseId(UUID courseId);
}