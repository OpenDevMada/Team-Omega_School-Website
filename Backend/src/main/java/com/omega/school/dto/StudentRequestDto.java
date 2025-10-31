package com.omega.school.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StudentRequestDto extends UserRequestDto {
    @NotBlank
    private String registrationNumber;

    @NotBlank
    private String level;

    @NotBlank
    private String group;
}
