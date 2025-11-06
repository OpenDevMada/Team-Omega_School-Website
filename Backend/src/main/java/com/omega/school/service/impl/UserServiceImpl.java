package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.omega.school.dto.UserRequestDto;
import com.omega.school.mapper.UserMapper;
import com.omega.school.model.Role;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.UserService;

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
        newUser.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    @Override
    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id)
                .map(existing -> {

                    if (!existing.getEmail().equals(updatedUser.getEmail()) &&
                            userRepository.existsByEmail(updatedUser.getEmail())) {
                        throw new IllegalArgumentException("Email déjà utilisé");
                    }

                    existing.setFirstName(updatedUser.getFirstName());
                    existing.setLastName(updatedUser.getLastName());
                    existing.setAddress(updatedUser.getAddress());
                    existing.setPhoneNumber(updatedUser.getPhoneNumber());
                    existing.setEmail(updatedUser.getEmail());
                    existing.setRole(updatedUser.getRole());
                    existing.setUpdatedAt(LocalDateTime.now());

                    if (updatedUser.getPasswordHash() != null && !updatedUser.getPasswordHash().isBlank()) {
                        existing.setPasswordHash(passwordEncoder.encode(updatedUser.getPasswordHash()));
                    }

                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
