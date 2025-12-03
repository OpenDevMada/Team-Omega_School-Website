package com.omega.school.service.impl;

import org.springframework.stereotype.Service;

import com.omega.school.dto.AuthResponseDto;
import com.omega.school.dto.LoginRequestDto;
import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.dto.StudentRequestDto;

import com.omega.school.model.Student;
import com.omega.school.model.User;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final StudentServiceImpl studentServiceImpl;
    private final JwtServiceImpl jwtService;
    private final PasswordEncoder passwordEncoder;
    private final OtpServiceImpl otpService;
    private final MailServiceImpl mailService;

    @Override
    public Student register(RegisterRequestDto request) {
        StudentRequestDto studentRequestDto = new StudentRequestDto();
        studentRequestDto.setAddress(request.getAddress());
        studentRequestDto.setBirthDate(request.getBirthDate());
        studentRequestDto.setEmail(request.getEmail());
        studentRequestDto.setEmergencyContact(request.getEmergencyContact());
        studentRequestDto.setFirstName(request.getFirstName());
        studentRequestDto.setLastName(request.getLastName());
        studentRequestDto.setGroup(request.getGroup());
        studentRequestDto.setLevel(request.getLevel());
        studentRequestDto.setSex(request.getSex());
        studentRequestDto.setPhoneNumber(request.getPhoneNumber());

        return studentServiceImpl.createStudent(studentRequestDto);

    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        // Génération du token d'accès
        String accessToken = jwtService.generateAccessToken(user);

        // Génération du token de rafraîchissement
        String refreshToken = jwtService.generateRefreshToken(user.getUserId());

        return new AuthResponseDto(
                accessToken,
                refreshToken,
                user.getEmail(),
                user.getRole());
    }

    public AuthResponseDto refreshToken(String refreshToken) {

        if (!jwtService.isTokenValid(refreshToken)) {
            throw new RuntimeException("Refresh token invalide");
        }

        String email = jwtService.extractEmail(refreshToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtService.generateAccessToken(user);

        String newRefreshToken = jwtService.generateRefreshToken(user.getUserId());

        return new AuthResponseDto(newAccessToken, newRefreshToken, user.getEmail(), user.getRole());
    }

    @Override
    public void sendPasswordResetOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String otp = otpService.generateAndSaveOtp(email);
        mailService.sendOtpEmail(email, otp);
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        return otpService.verifyOtp(email, otp);
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        if (!otpService.verifyOtp(email, otp)) {
            throw new RuntimeException("OTP invalide ou expiré");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        otpService.deleteOtp(email);
    }
}
