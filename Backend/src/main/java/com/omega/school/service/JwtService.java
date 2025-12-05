package com.omega.school.service;

import java.util.UUID;

import com.omega.school.model.User;

public interface JwtService {
    String generateAccessToken(User user);

    String generateRefreshToken(UUID userId);

    String extractUserId(String token);

    String extractEmail(String token);

    String extractRole(String token);

    boolean isTokenValid(String token);

}