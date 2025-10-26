package com.omega.school.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Student;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByRegistrationNumber(String registrationNumber);

    List<Student> findByLevel_LevelName(String levelName);

    List<Student> findByGroup_GroupName(String groupName);
}
