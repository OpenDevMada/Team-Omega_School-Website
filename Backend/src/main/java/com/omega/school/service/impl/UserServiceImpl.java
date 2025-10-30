package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import com.omega.school.model.Role;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.UserService;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
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