package com.omega.school.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.StringRedisTemplate;

@Service
public class RedisTestService {

    private final StringRedisTemplate redisTemplate;

    public RedisTestService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean testConnection() {
        try {
            redisTemplate.opsForValue().set("ping", "pong");
            String value = redisTemplate.opsForValue().get("ping");
            return "pong".equals(value);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}