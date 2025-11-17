package com.omega.school.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.omega.school.model.Grade;
import com.omega.school.model.GradeId;

public interface GradeRepository extends JpaRepository<Grade, GradeId> {

    List<Grade> findByStudentUserId(UUID studentId);

    List<Grade> findByCourseCourseId(UUID courseId);

    Page<Grade> findByStudentRegistrationNumber(String registration, Pageable pageable);

    Page<Grade> findByCourseTitle(String title, Pageable pageable);

}