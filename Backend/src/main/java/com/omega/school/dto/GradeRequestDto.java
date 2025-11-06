package com.omega.school.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeRequestDto {
    @NotBlank
    private String studentRegistration;

    @NotBlank
    private String courseTitle;

    private double value;
    private String comment;
}
