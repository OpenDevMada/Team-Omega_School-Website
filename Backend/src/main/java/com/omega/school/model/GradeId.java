package com.omega.school.model;

import java.io.Serializable;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@Setter
@Embeddable
public class GradeId implements Serializable {
    @Column(name = "student_id")
    private UUID studentId;

    @Column(name = "course_id")
    private UUID courseId;
}
