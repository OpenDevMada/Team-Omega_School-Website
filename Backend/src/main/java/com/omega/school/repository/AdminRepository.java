package com.omega.school.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.omega.school.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, UUID> {

    Optional<Admin> findByAdminId(String adminId);

    boolean existsByAdminId(String adminId);

    @Query("SELECT a.adminId FROM Admin a WHERE a.adminId LIKE CONCAT(:prefix, '%') ORDER BY a.adminId DESC")
    List<String> findLastAdminIdOfYear(@Param("prefix") String prefix, Pageable pageable);

}