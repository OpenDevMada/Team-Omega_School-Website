package com.omega.school.model;

import java.time.LocalDateTime;
import jakarta.persistence.EmbeddedId;
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
@ToString
public class Enrollment {
    @EmbeddedId
    private EmbeddedId id;
    private Student student;
    private Course course;
    private LocalDateTime enrolledAt;
}
