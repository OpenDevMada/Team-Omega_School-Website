package com.omega.school.mapper;

import com.omega.school.dto.UserRequestDto;
import com.omega.school.model.User;
import java.time.LocalDateTime;

public class UserMapper {

    public static User toEntity(UserRequestDto dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setBirthDate(dto.getBirthDate());
        user.setSex(dto.getSex());
        user.setAddress(dto.getAddress());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setPasswordHash(dto.getPassword());
        user.setRole(dto.getRole());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return user;
    }

    public static UserRequestDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserRequestDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getBirthDate(),
                user.getSex(),
                user.getAddress(),
                user.getPhoneNumber(),
                user.getPasswordHash(), // tu peux masquer plus tard
                user.getRole());
    }
}
