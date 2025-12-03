package com.omega.school.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omega.school.dto.AuthResponseDto;
import com.omega.school.dto.LoginRequestDto;
import com.omega.school.dto.OtpVerifyDto;
import com.omega.school.dto.PasswordResetRequestDto;
import com.omega.school.dto.RegisterRequestDto;
import com.omega.school.dto.ResetPasswordDto;
import com.omega.school.model.Student;
import com.omega.school.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CookieValue;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody RegisterRequestDto request) {
        Student student = authService.register(request);
        return ResponseEntity.ok(student);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request) {
        AuthResponseDto response = authService.login(request);

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refreshToken(
            @CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            return ResponseEntity.status(401).build();
        }

        AuthResponseDto response = authService.refreshToken(refreshToken);

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", response.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("None")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(response);
    }

    @PostMapping("/request-reset")
    public ResponseEntity<String> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDto dto) {
        authService.sendPasswordResetOtp(dto.getEmail());
        return ResponseEntity.ok("OTP envoyé à votre email.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Boolean> verifyOtp(@Valid @RequestBody OtpVerifyDto dto) {
        boolean ok = authService.verifyOtp(dto.getEmail(), dto.getOtp());
        return ResponseEntity.ok(ok);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordDto dto) {
        authService.resetPassword(dto.getEmail(), dto.getOtp(), dto.getNewPassword());
        return ResponseEntity.ok("Mot de passe mis à jour avec succès.");
    }

}
