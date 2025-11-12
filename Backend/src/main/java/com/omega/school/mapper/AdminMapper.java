package com.omega.school.mapper;

import java.time.LocalDateTime;

import com.omega.school.dto.AdminRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.Admin;

public class AdminMapper {
    public static Admin toEntity(AdminRequestDto dto) {
        if (dto == null) {
            return null;
        }

        Admin admin = new Admin();
        admin.setFirstName(dto.getFirstName());
        admin.setLastName(dto.getLastName());
        admin.setEmail(dto.getEmail());
        admin.setAddress(dto.getAddress());
        admin.setBirthDate(dto.getBirthDate());
        admin.setPhoneNumber(dto.getPhoneNumber());
        admin.setRole(dto.getRole());
        admin.setSex(dto.getSex());
        admin.setPasswordHash(dto.getPassword());
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        admin.setAdminId(dto.getAdminId());

        return admin;
    }

    public static Admin updateEntity(Admin existing, UserUpdateDto dto) {
        if (existing == null || dto == null)
            return existing;

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setAddress(dto.getAddress());
        existing.setBirthDate(dto.getBirthDate());
        existing.setPhoneNumber(dto.getPhoneNumber());
        existing.setSex(dto.getSex());
        existing.setUpdatedAt(LocalDateTime.now());

        return existing;
    }
}
