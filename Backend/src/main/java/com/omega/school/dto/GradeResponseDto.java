package com.omega.school.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeResponseDto {
    private String studentRegistration;
    private String courseTitle;
    private double value;
    private String comment;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
