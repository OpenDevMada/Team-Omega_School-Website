package com.omega.school.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

import com.omega.school.dto.AdminRequestDto;
import com.omega.school.mapper.AdminMapper;
import com.omega.school.model.Admin;
import com.omega.school.repository.AdminRepository;
import com.omega.school.service.AdminService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Override
    public Admin createAdmin(AdminRequestDto dto) {
        if (adminRepository.existsByAdminId(dto.getAdminId())) {
            throw new IllegalArgumentException("Admin ID déjà utilisé");
        }

        Admin admin = AdminMapper.toEntity(dto);
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
    public Admin updateAdmin(UUID id, AdminRequestDto updatedAdmin) {
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