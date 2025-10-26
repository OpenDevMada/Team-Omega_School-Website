package com.omega.school.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omega.school.model.Grade;
import com.omega.school.model.GradeId;

public interface GradeRepository extends JpaRepository<Grade, GradeId> {

    List<Grade> findByStudent_UserId(UUID studentId);

    List<Grade> findByCourse_CourseId(UUID courseId);
}