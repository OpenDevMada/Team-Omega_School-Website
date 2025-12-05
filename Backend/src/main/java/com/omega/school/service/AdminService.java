package com.omega.school.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.omega.school.dto.UserPartialUpdateDto;
import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.Admin;

public interface AdminService {
    Admin createAdmin(UserRequestDto admin);

    Optional<Admin> getAdminById(UUID userId);

    Optional<Admin> getByAdminId(String adminId);

    Page<Admin> getAllAdmins(int page, int size);

    Admin updateAdmin(UUID userId, UserUpdateDto updatedAdmin);

    Admin partialUpdateAdmin(UUID userId, UserPartialUpdateDto dto);

    void deleteAdmin(UUID userId);

    Optional<Admin> getByEmail(String email);
}
