package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    Page<Course> findByTeacherUserId(UUID teacherId, Pageable pageable);

    boolean existsByTitle(String title);

    Optional<Course> findByTitle(String title);
}
