package com.omega.school.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.AdminRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.mapper.AdminMapper;
import com.omega.school.model.Admin;
import com.omega.school.repository.AdminRepository;
import com.omega.school.service.AdminService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Admin createAdmin(AdminRequestDto dto) {
        if (adminRepository.existsByAdminId(dto.getAdminId())) {
            throw new IllegalArgumentException("Admin ID déjà utilisé");
        }

        Admin admin = AdminMapper.toEntity(dto);
        admin.setPasswordHash(passwordEncoder.encode(dto.getPassword())); // hash
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> getAdminById(UUID userId) {
        return adminRepository.findById(userId);
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
    public Admin updateAdmin(UUID userId, UserUpdateDto updatedAdmin) {
        return adminRepository.findById(userId)
                .map(existing -> {
                    AdminMapper.updateEntity(existing, updatedAdmin);

                    return adminRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Admin non trouvé"));
    }

    @Override
    public void deleteAdmin(UUID userId) {
        if (!adminRepository.existsById(userId)) {
            throw new EntityNotFoundException("Admin non trouvé");
        }
        adminRepository.deleteById(userId);
    }
}
