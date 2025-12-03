package com.omega.school.service;

import com.omega.school.dto.AuthResponseDto;
import com.omega.school.dto.LoginRequestDto;
import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.model.Student;

public interface AuthService {
    Student register(RegisterRequestDto request);

    AuthResponseDto login(LoginRequestDto request);

    AuthResponseDto refreshToken(String refreshToken);

    void sendPasswordResetOtp(String email);

    boolean verifyOtp(String email, String otp);

    void resetPassword(String email, String otp, String newPassword);

}
