package com.omega.school.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.omega.school.model.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByRegistrationNumber(String registrationNumber);

    List<Student> findByLevelName(String levelName);

    List<Student> findByGroupName(String groupName);

    boolean existsByRegistrationNumber(String registrationNumber);

    boolean existsByEmail(String email);

    @Query("SELECT s.registrationNumber FROM Student s WHERE s.registrationNumber LIKE CONCAT(:prefix, '%') ORDER BY s.registrationNumber DESC")
    List<String> findLastRegistrationNumberOfYear(@Param("prefix") String prefix, Pageable pageable);

}
