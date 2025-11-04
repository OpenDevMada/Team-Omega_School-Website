package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Level;

public interface LevelRepository extends JpaRepository<Level, UUID> {
    Optional<Level> findByName(String name);

    boolean existsByName(String name);

}
