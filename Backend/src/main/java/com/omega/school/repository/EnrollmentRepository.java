package com.omega.school.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.omega.school.model.Enrollment;
import com.omega.school.model.EnrollmentId;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {
        @Query("SELECT e FROM Enrollment e WHERE e.student.registrationNumber = :registrationNumber")
        Page<Enrollment> findByStudentRegistrationNumber(String registrationNumber, Pageable pageable);

        @Query("SELECT e FROM Enrollment e WHERE e.course.title = :title")
        Page<Enrollment> findByCourseTitle(String title, Pageable pageable);

        @Query("SELECT e FROM Enrollment e WHERE e.student.registrationNumber = :registrationNumber AND e.course.teacher.userId = :teacherId")
        Page<Enrollment> findByStudentRegistrationAndTeacherId(String registrationNumber, UUID teacherId,
                        Pageable pageable);

        @Query("SELECT e FROM Enrollment e WHERE e.course.title = :title AND e.course.teacher.userId = :teacherId")
        Page<Enrollment> findByCourseTitleAndTeacherId(String title, UUID teacherId, Pageable pageable);

        @Query("SELECT e FROM Enrollment e WHERE e.course.title = :title AND e.student.registrationNumber = :registrationNumber")
        Page<Enrollment> findByCourseTitleAndStudentRegistration(String title, String registrationNumber,
                        Pageable pageable);

}
