package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.stereotype.Service;
import com.omega.school.dto.UserRequestDto;
import com.omega.school.mapper.UserMapper;
import com.omega.school.model.Role;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User createUser(UserRequestDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        User newUser = UserMapper.toEntity(userDto);
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
                    existing.setFirstName(updatedUser.getFirstName());
                    existing.setLastName(updatedUser.getLastName());
                    existing.setAddress(updatedUser.getAddress());
                    existing.setPhoneNumber(updatedUser.getPhoneNumber());
                    existing.setEmail(updatedUser.getEmail());
                    existing.setUpdatedAt(LocalDateTime.now());
                    existing.setRole(updatedUser.getRole());
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new NoSuchElementException("Utilisateur non trouvé"));
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
