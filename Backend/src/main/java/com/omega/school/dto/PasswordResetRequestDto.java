package com.omega.school.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class PasswordResetRequestDto {
    @Email
    @NotBlank
    private String email;
}
