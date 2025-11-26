package com.omega.school.service;

import com.omega.school.model.User;

public interface JwtService {
    String generateToken(User user);

    String extractEmail(String token);

    String extractRole(String token);

}