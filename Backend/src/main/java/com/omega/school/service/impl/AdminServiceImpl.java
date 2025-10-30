package com.omega.school.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import com.omega.school.model.Admin;
import com.omega.school.repository.AdminRepository;
import com.omega.school.service.AdminService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin createAdmin(Admin admin) {
        if (adminRepository.existsByAdminId(admin.getAdminId())) {
            throw new IllegalArgumentException("Admin ID déjà utilisé");
        }
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> getAdminById(UUID id) {
        return adminRepository.findById(id);
    }

    @Override
    public Optional<Admin> getByAdminId(String adminId) {
        return adminRepository.findByAdminId(adminId);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(UUID id, Admin updatedAdmin) {
        return adminRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updatedAdmin.getFirstName());
                    existing.setLastName(updatedAdmin.getLastName());
                    existing.setAddress(updatedAdmin.getAddress());
                    existing.setPhoneNumber(updatedAdmin.getPhoneNumber());
                    return adminRepository.save(existing);
                })
                .orElseThrow(() -> new NoSuchElementException("Admin non trouvé"));
    }

    @Override
    public void deleteAdmin(UUID id) {
        adminRepository.deleteById(id);
    }
}