package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.omega.school.dto.UserPartialUpdateDto;
import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.mapper.UserMapper;
import com.omega.school.model.Role;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.UserService;
import com.omega.school.utils.TemporaryPassword;

import lombok.RequiredArgsConstructor;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRequestDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        User newUser = UserMapper.toEntity(userDto);

        String tempPassword = TemporaryPassword.generateTemporaryPassword();

        newUser.setPasswordHash(passwordEncoder.encode(tempPassword));

        newUser.setMustChangePassword(true);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    @Override
    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> getUsersByRole(Role role, Pageable pageable) {
        return userRepository.findByRole(role, pageable);
    }

    @Override
    public User updateUser(UUID id, UserUpdateDto updatedUserDto) {
        return userRepository.findById(id)
                .map(existing -> {

                    if (!existing.getEmail().equals(updatedUserDto.getEmail()) &&
                            userRepository.existsByEmail(updatedUserDto.getEmail())) {
                        throw new IllegalArgumentException("Email déjà utilisé");
                    }

                    UserMapper.updateEntityFromDto(updatedUserDto, existing);
                    existing.setUpdatedAt(LocalDateTime.now());

                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
    }

    @Override
    public User partialUpdateUser(UUID id, UserPartialUpdateDto dto) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        UserMapper.partialUpdate(dto, existingUser);

        existingUser.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
