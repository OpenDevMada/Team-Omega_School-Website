package com.omega.school.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponseDto {
    private String title;
    private String description;
    private String teacherMatricule;
    private String teacherName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
