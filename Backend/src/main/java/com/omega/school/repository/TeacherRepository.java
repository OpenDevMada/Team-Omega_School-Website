package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    Optional<Teacher> findByMatriculeNumber(String matriculeNumber);

    boolean existsByMatriculeNumber(String matriculeNumber);

}
