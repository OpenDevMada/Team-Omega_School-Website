package com.omega.school.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omega.school.service.impl.RedisTestService;

@RestController
public class RedisTestController {

    private final RedisTestService redisTestService;

    public RedisTestController(RedisTestService redisTestService) {
        this.redisTestService = redisTestService;
    }

    @GetMapping("/redis-test")
    public String testRedis() {
        boolean ok = redisTestService.testConnection();
        return ok ? "✅ Redis OK" : "❌ Impossible de se connecter à Redis";
    }
}
