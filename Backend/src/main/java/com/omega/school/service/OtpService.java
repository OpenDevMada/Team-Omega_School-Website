package com.omega.school.service;

public interface OtpService {

    String generateAndSaveOtp(String email);

    boolean verifyOtp(String email, String otp);

    void deleteOtp(String email);
}
