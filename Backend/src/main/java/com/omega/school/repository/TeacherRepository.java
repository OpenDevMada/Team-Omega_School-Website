package com.omega.school.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import com.omega.school.model.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    Optional<Teacher> findByMatriculeNumber(String matriculeNumber);

    boolean existsByMatriculeNumber(String matriculeNumber);

    @Query("SELECT t.matriculeNumber FROM Teacher t WHERE t.matriculeNumber LIKE CONCAT(:prefix, '%') ORDER BY t.matriculeNumber DESC")
    List<String> findLastMatriculeOfYear(@Param("prefix") String prefix,
            Pageable pageable);

    Optional<Teacher> findByEmail(String email);

}
