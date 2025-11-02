package com.omega.school.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByTeacherUserId(UUID teacherId);

    boolean existsByTitle(String title);

    Optional<Course> findByTitle(String title);
}
