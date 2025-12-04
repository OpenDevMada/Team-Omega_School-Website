package com.omega.school.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omega.school.model.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByEmail(String email);

    void deleteByEmail(String email);
}
