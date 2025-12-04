package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.omega.school.model.Otp;
import com.omega.school.repository.OtpRepository;
import com.omega.school.service.OtpService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final Random random = new Random();

    @Override
    public String generateAndSaveOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000));

        LocalDateTime expiration = LocalDateTime.now().plusMinutes(5);

        // supprime ancien OTP si existe
        otpRepository.deleteByEmail(email);

        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setCode(otp);
        otpEntity.setExpiresAt(expiration);

        otpRepository.save(otpEntity);

        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        return otpRepository.findByEmail(email)
                .filter(o -> o.getCode().equals(otp))
                .filter(o -> o.getExpiresAt().isAfter(LocalDateTime.now()))
                .isPresent();
    }

    @Override
    public void deleteOtp(String email) {
        otpRepository.deleteByEmail(email);
    }
}
