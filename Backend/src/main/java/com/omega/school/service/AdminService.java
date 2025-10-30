package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.omega.school.model.Admin;

public interface AdminService {
    Admin createAdmin(Admin admin);

    Optional<Admin> getAdminById(UUID id);

    Optional<Admin> getByAdminId(String adminId);

    List<Admin> getAllAdmins();

    Admin updateAdmin(UUID id, Admin updatedAdmin);

    void deleteAdmin(UUID id);
}
