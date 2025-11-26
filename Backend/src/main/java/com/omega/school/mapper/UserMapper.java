package com.omega.school.mapper;

import com.omega.school.dto.UserPartialUpdateDto;
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
        user.setAvatarUrl(dto.getAvatarUrl());

        return user;
    }

    public static UserRequestDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserRequestDto(
                user.getAvatarUrl(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getBirthDate(),
                user.getSex(),
                user.getAddress(),
                user.getPhoneNumber());
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
        user.setAvatarUrl(dto.getAvatarUrl());

    }

    public static void partialUpdate(UserPartialUpdateDto dto, User user) {

        if (dto.getAvatarUrl() != null)
            user.setAvatarUrl(dto.getAvatarUrl());
        if (dto.getFirstName() != null)
            user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null)
            user.setLastName(dto.getLastName());
        if (dto.getBirthDate() != null)
            user.setBirthDate(dto.getBirthDate());
        if (dto.getSex() != null)
            user.setSex(dto.getSex());
        if (dto.getAddress() != null)
            user.setAddress(dto.getAddress());
        if (dto.getPhoneNumber() != null)
            user.setPhoneNumber(dto.getPhoneNumber());
    }
}
