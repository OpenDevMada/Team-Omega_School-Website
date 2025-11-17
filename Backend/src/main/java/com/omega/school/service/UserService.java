package com.omega.school.service;

import java.util.Optional;
import java.util.UUID;

import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.Role;
import com.omega.school.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User createUser(UserRequestDto userDto);

    Optional<User> getUserById(UUID id);

    Optional<User> getUserByEmail(String email);

    Page<User> getAllUsers(Pageable pageable);

    Page<User> getUsersByRole(Role role, Pageable pageable);

    User updateUser(UUID id, UserUpdateDto updatedUser);

    void deleteUser(UUID id);
}