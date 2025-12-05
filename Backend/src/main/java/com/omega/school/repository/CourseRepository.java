package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.omega.school.model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    Page<Course> findByTeacherUserId(UUID teacherId, Pageable pageable);

    boolean existsByTitle(String title);

    Optional<Course> findByTitle(String title);

    @Query("SELECT c FROM Course c JOIN Enrollment e ON c.title = e.course.title " +
            "WHERE e.student.registrationNumber = :registration")
    Page<Course> findCoursesByStudent(
            @Param("registration") String registration,
            Pageable pageable);

    @Query("SELECT c FROM Course c JOIN Enrollment e ON c.title = e.course.title " +
            "WHERE e.student.registrationNumber = :registration " +
            "AND c.teacher.userId = :teacherId")
    Page<Course> findCoursesByStudentAndTeacher(
            @Param("registration") String registration,
            @Param("teacherId") String teacherId,
            Pageable pageable);

}