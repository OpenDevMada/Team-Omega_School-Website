package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.omega.school.model.Role;
import com.omega.school.model.User;

public interface UserService {
    User createUser(User user);

    Optional<User> getUserById(UUID id);

    Optional<User> getUserByEmail(String email);

    List<User> getAllUsers();

    List<User> getUsersByRole(Role role);

    User updateUser(UUID id, User updatedUser);

    void deleteUser(UUID id);
}