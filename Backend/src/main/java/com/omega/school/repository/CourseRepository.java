package com.omega.school.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByTeacher_UserId(UUID teacherId);

    boolean existsByTitle(String title);
}
