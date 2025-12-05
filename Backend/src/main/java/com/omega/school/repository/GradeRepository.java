package com.omega.school.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.omega.school.model.Grade;
import com.omega.school.model.GradeId;

public interface GradeRepository extends JpaRepository<Grade, GradeId> {

    List<Grade> findByStudentUserId(UUID studentId);

    List<Grade> findByCourseCourseId(UUID courseId);

    @Query("SELECT g FROM Grade g WHERE g.student.registrationNumber = :registration")
    Page<Grade> findByStudentRegistrationNumber(String registration, Pageable pageable);

    @Query("SELECT g FROM Grade g WHERE g.course.title = :title")
    Page<Grade> findByCourseTitle(String title, Pageable pageable);

    @Query("SELECT g FROM Grade g WHERE g.student.registrationNumber = :registration AND g.course.teacher.userId = :teacherId")
    Page<Grade> findByStudentRegistrationAndTeacherId(String registration, String teacherId, Pageable pageable);

}