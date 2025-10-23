package com.omega.school.model;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString(exclude = "teacher")
public class Course {
    private UUID courseId;
    private String title;
    private Teacher teacher;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
