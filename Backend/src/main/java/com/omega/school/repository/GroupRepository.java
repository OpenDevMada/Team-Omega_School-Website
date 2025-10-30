package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Group;

public interface GroupRepository extends JpaRepository<Group, UUID> {
    Optional<Group> findByGroupName(String groupName);

    boolean existByGroupName(String groupName);
}