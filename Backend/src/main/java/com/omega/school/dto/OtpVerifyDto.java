package com.omega.school.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class OtpVerifyDto {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String otp;
}
