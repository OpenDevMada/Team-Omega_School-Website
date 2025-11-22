package com.omega.school.mapper;

import java.time.LocalDateTime;

import com.omega.school.dto.UserPartialUpdateDto;
import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.Admin;
import com.omega.school.model.Role;

public class AdminMapper {
    public static Admin toEntity(UserRequestDto dto) {
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
        admin.setRole(Role.ADMIN);
        admin.setSex(dto.getSex());
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());

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

    public static Admin partialUpdate(Admin admin, UserPartialUpdateDto dto) {
        if (dto == null || admin == null)
            return admin;

        if (dto.getFirstName() != null)
            admin.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null)
            admin.setLastName(dto.getLastName());
        if (dto.getEmail() != null)
            admin.setEmail(dto.getEmail());
        if (dto.getAddress() != null)
            admin.setAddress(dto.getAddress());
        if (dto.getBirthDate() != null)
            admin.setBirthDate(dto.getBirthDate());
        if (dto.getPhoneNumber() != null)
            admin.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getSex() != null)
            admin.setSex(dto.getSex());
        if (dto.getAvatarUrl() != null)
            admin.setAvatarUrl(dto.getAvatarUrl());

        admin.setUpdatedAt(LocalDateTime.now());
        return admin;
    }
}
