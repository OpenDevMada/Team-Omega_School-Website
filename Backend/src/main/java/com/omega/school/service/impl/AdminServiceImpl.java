package com.omega.school.service.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.mapper.AdminMapper;
import com.omega.school.model.Admin;
import com.omega.school.repository.AdminRepository;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.AdminService;
import com.omega.school.utils.GenerateId;
import com.omega.school.utils.TemporaryPassword;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final GenerateId generateId;

    @Override
    public Admin createAdmin(UserRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        Admin admin = AdminMapper.toEntity(dto);

        String temporaryPassword = TemporaryPassword.generateTemporaryPassword();

        admin.setPasswordHash(passwordEncoder.encode(temporaryPassword));
        admin.setMustChangePassword(true);

        String adminId = generateId.generateAdminId();
        admin.setAdminId(adminId);

        // TODO: envoyer l'email au user contenant le mot de passe temporaire
        // mailService.sendTemporaryPassword(dto.getEmail(), tempPassword);

        System.out.println("This is the temporary password: " + temporaryPassword);

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
    public Page<Admin> getAllAdmins(int page, int size) {
        return adminRepository.findAll(PageRequest.of(page, size));
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
