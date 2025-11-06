package com.omega.school.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnrollmentRequestDto {
    @NotBlank
    private String studentRegistration;

    @NotBlank
    private String courseTitle;
}
