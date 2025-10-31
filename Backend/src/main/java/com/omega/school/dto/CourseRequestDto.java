package com.omega.school.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequestDto {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String teacherMatricule;
}
