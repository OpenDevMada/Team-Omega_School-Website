package com.omega.school.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EnrollmentResponseDto {
    private String studentRegistration;
    private String courseTitle;
    private LocalDateTime enrolledAt;
}
