package com.omega.school.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequestDto {
    @NotBlank
    @Size(max = 50)
    private String title;

    private String description;

    @NotBlank
    private String teacherMatricule;
}
