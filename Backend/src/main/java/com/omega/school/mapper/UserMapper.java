package com.omega.school.mapper;

import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.User;

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
                user.getPasswordHash(),
                user.getRole());
    }

    public static void updateEntityFromDto(UserUpdateDto dto, User user) {
        if (dto == null || user == null)
            return;

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setBirthDate(dto.getBirthDate());
        user.setSex(dto.getSex());
        user.setAddress(dto.getAddress());
        user.setPhoneNumber(dto.getPhoneNumber());
    }
}
