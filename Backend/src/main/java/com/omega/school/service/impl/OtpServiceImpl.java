package com.omega.school.service.impl;

import com.omega.school.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final StringRedisTemplate redisTemplate;
    private static final Duration OTP_TTL = Duration.ofMinutes(5);

    @Override
    public String generateAndSaveOtp(String email) {
        String otp = String.valueOf(100000 + ThreadLocalRandom.current().nextInt(900000));
        String key = buildKey(email);
        redisTemplate.opsForValue().set(key, otp, OTP_TTL);
        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        String key = buildKey(email);
        String stored = redisTemplate.opsForValue().get(key);
        return stored != null && stored.equals(otp);
    }

    @Override
    public void deleteOtp(String email) {
        redisTemplate.delete(buildKey(email));
    }

    private String buildKey(String email) {
        return "OTP:" + email.toLowerCase();
    }
}
