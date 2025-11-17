package com.omega.school.service;

import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.model.Student;

public interface AuthService {
    Student register(RegisterRequestDto request);
}
